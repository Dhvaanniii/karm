exports.VisitorNotificationFormat = (residentName, visitorName, wing, unit, visitorId, baseUrl, photoUrl, purpose) => {
    const allowLink = `${baseUrl}/api/v2/visitor/email-action/${visitorId}/approve`;
    const rejectLink = `${baseUrl}/api/v2/visitor/email-action/${visitorId}/reject`;

    let photoHtml = "";
    if (photoUrl) {
        photoHtml = `<img src="${photoUrl}" alt="Visitor Photo" style="width:150px; height:150px; border-radius:10px; margin:20px 0; object-cover: cover;" /><br>`;
    }

    let purposeHtml = "";
    if (purpose) {
        purposeHtml = `<b>Purpose:</b> ${purpose}<br>`;
    }

    return `
  <!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Visitor Arrival Notification</title>
      <meta name="description" content="Visitor Arrival Notification">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
          .btn {
              display: inline-block;
              padding: 10px 20px;
              margin: 10px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              color: #fff !important;
          }
          .btn-allow { background-color: #28a745; }
          .btn-reject { background-color: #dc3545; }
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
  
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              ${photoUrl ? photoHtml : '<img src="https://www.shutterstock.com/image-vector/visitor-icon-vector-illustration-260nw-1033621405.jpg" alt="Visitor Icon" style="width:100px; height:100px; border-radius:50px; margin-top:20px;" />'}
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Visitor Arrival Notification</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          Dear ${residentName},<br><br>
                                          A visitor has arrived at the gate for your unit.<br><br>
                                          <b>Visitor Name:</b> ${visitorName}<br>
                                          <b>Wing:</b> ${wing}<br>
                                          <b>Unit:</b> ${unit}<br>
                                          ${purposeHtml}
                                          <br>
                                          Please select an action below to allow or not allow the visitor entry.<br><br>
                                          <a href="${allowLink}" class="btn btn-allow">Allow Entry</a>
                                          <a href="${rejectLink}" class="btn btn-reject">Not Allow</a>
                                          <br><br>
                                          Best Regards,<br>
                                          Management
                                          </p>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
   
  </body>
  
  </html>`;
  };
  