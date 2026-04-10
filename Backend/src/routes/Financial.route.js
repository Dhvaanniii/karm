const FinancialController = require("../controller/income.controller");
const NoteController = require("../controller/note.controller");
const ExpenseController = require("../controller/expense.controller");
const MaintenanceController = require("../controller/maintanance.controller");

const { auth } = require("../middleware/auth");
const upload = require("../utils/Owner.images");
const router = require("express").Router();
//add notes
router.post("/addnote", NoteController.CreateNote);
//get notes
router.get("/viewnote", NoteController.GetAllNotes);
//get By Id Notes
router.get("/note/:id", NoteController.GetByIdNotes);
//delete note
router.delete("/note/:id", NoteController.DeleteNote);
//Update Note
router.patch("/note/:id", NoteController.UpdateNote);
//add expense
router.post(
  "/addexpense",
  upload.fields([{ name: "bill", maxCount: 1 }]),
  ExpenseController.CreateExpense
);
//get expense
router.get("/viewexpense", ExpenseController.GetAllExpense);
//get by id
router.get("/expense/:id", ExpenseController.GetByIdExpense);
//total amount expense
router.get(
  "/ex/expense/total-amount",
  ExpenseController.getTotalExpenseAmount
);
//delete expens
router.delete("/expense/:id", ExpenseController.DeleteExpens);
//update expens
router.patch(
  "/expense/:id",
  upload.fields([{ name: "bill", maxCount: 1 }]),
  ExpenseController.UpdateExpense
);

//check password correction in maintenance
router.post(
  "/checkpassword",
  auth,
  MaintenanceController.CheckMaintenancePassword
);

//add maintenance
router.post("/addmaintenance", MaintenanceController.CreateMaintenance);
//get maintenance
router.get("/viewmaintenance", MaintenanceController.GetMaintenance);
//update and get payment
router.put(
  "/maintenance/:maintenanceId/resident/payment",
  auth,
  MaintenanceController.updatePaymentMode
);
//FindByIdUserAndMaintance
router.get(
  "/getuserandMaintance",
  auth,
  MaintenanceController.FindByIdUserAndMaintance
);
//apply penlty
router.post("/applypenlty", MaintenanceController.applyPenalty);
//get done maintannace
router.get("/donemaintannace",auth, MaintenanceController.GetMaintananceDone);
//generate pdf maintanance
router.post("/main/generate-pdf",MaintenanceController.GeneratePdf)

// Admin approves cash payment
router.put('/maintenance/:maintenanceId/approveCashPayment/:residentId', auth,MaintenanceController.approveOrRejectPayment);

//add income
router.post("/addincome", FinancialController.CreateIncome);
//get income
router.get("/viewincome", FinancialController.GetIncome);
//get by id income
router.get("/income/:id", FinancialController.GetByIdIncome);
//update and get payment
router.put(
  "/income/:incomeId/resident/payment",
  auth,
  FinancialController.updatePaymentModeIncome
);
//delete income
router.delete("/income/:id", FinancialController.DeleteIncome);
//update income
router.patch("/income/:id", FinancialController.UpdateIncome);
//get done income
router.get("/doneincome", FinancialController.GetIncomeDone);
// Admin approves cash payment income
router.put('/income/:incomeId/approveCashPayment/:residentId', auth,FinancialController.approveOrRejectIncomePayment);
//get done income total
router.get("/totalMaintenanceDone", FinancialController.GetTotalIncomeeDone);
//FindByIdUserAndIncome
router.get(
  "/getuserandIncome",
  auth,
  FinancialController.FindByIdUserAndIncome
);
//generate pdf income
router.post("/generate-pdf",FinancialController.GeneratePdf)

module.exports = router;
