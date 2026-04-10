const Poll = require("../models/poll.model");


// Create a new poll
exports.createPoll = async (req, res) => {
    try {
        const { pollType, question, options } = req.body;
        if (
            !pollType ||
            !question ||
            !options 
          ) {
            return res.status(400).json({
              success: false,
              message: "All fields are required",
            });
          }

          const userType = req.user.Resident_status;

          if (userType !== 'Owner' && userType !== 'Tenante') {
            return res.status(400).json({
                success: false,
                message: "Invalid user type for creating a poll",
            });
        }

        const poll = new Poll({
            pollType,
            question,
            options: options.map(option => ({ text: option })),
            createdBy: req.user._id, 
            createdByType:userType 
        });

        await poll.save();
        return res.status(201).json({ success: true, message:"Poll created Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating poll' });
    }
};
// Get all polls
exports.getPolls = async (req, res) => {
    try {
        
        const polls = await Poll.find({})
            .populate({
                path: 'createdBy', 
            })
            .sort({ createdAt: -1 }); 

       
        const formattedPolls = polls.map((poll) => {
            const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
            return {
                ...poll._doc, 
                totalVotes, 
            };
        });

        
        return res.status(200).json({ success: true, polls: formattedPolls });
    } catch (error) {
        
        return res.status(500).json({ success: false, message: 'Error fetching polls' });
    }
};
exports.voteInPoll = async (req, res) => {
    const { pollId, optionId } = req.body; 
    const userId = req.user._id; 

    try {
        
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ success: false, message: 'Poll not found' });
        }

       
        poll.options.forEach((option) => {
            if (option.voters.some((voter) => voter.toString() === userId.toString())) {
                
                option.votes -= 1;
                option.voters = option.voters.filter(
                    (voter) => voter.toString() !== userId.toString()
                );
            }
        });

       
        const selectedOption = poll.options.find(
            (option) => option._id.toString() === optionId
        );
        if (!selectedOption) {
            return res.status(400).json({ success: false, message: 'Invalid poll option' });
        }

        selectedOption.votes += 1;
        selectedOption.voters.push(userId);

       
        await poll.save();

        return res.status(200).json({ success: true, message: 'Vote updated successfully', poll });
    } catch (error) {
      
        return res.status(500).json({ success: false, message: 'Error voting in poll' });
    }
};





  
