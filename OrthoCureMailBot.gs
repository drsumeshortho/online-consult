function doPost(e) {
  if (!e || !e.parameter) {
    Logger.log("Missing parameters in request.");
    return ContentService.createTextOutput("No parameters received");
  }

  const data = e.parameter;

  const sheet = SpreadsheetApp.openById("1Mo-2e1L9kHAEyMBoPDxu05avVYMs8MT-47R_KjsVVc8")
                  .getSheetByName("OrthoConsult_Responses");

  // Append data to sheet (optional fallback)
  sheet.appendRow([
    new Date(), data.name, data.age, data.gender, data.email,
    data.problem, data.consultationDay, data.preferredTime,
    data.preferredExactTime, data.whatsapp, "Yes"
  ]);

  // Send email alert
  const subject = "🩺 New OrthoCure Online Consultation Request";
  const message = `
New Consultation Request Received:

👤 Name: ${data.name}
📅 Day: ${data.consultationDay} | ⏰ Time Slot: ${data.preferredTime} (${data.preferredExactTime || "N/A"})
📞 WhatsApp: ${data.whatsapp}
📧 Email: ${data.email}

📝 Problem: ${data.problem}
🔒 Consent: Given

Check the tracker: https://docs.google.com/spreadsheets/d/1Mo-2e1L9kHAEyMBoPDxu05avVYMs8MT-47R_KjsVVc8
`;

  MailApp.sendEmail("drsumesh.ortho@gmail.com", subject, message);

  return ContentService.createTextOutput("Success");
}
