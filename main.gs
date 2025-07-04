/**
 * Função que envia um e-mail de alerta caso o saldo esteja negativo.
 * Os dados são lidos da aba "Alerta" de uma planilha do Google Sheets.
 */
function enviarAlertaEmail() {
  // Acessa a aba "Alerta" da planilha atual
  var sheet = SpreadsheetApp.getActive().getSheetByName("Alerta");

  // Lê o e-mail do destinatário (célula B8) e o saldo (célula B4)
  var email = sheet.getRange("B8").getValue();
  var saldo = sheet.getRange("B4").getValue();
  var dataHora = new Date();

  // Se o saldo for negativo, envia o e-mail de alerta
  if (saldo < 0) {
    MailApp.sendEmail({
      to: email,
      subject: "⚠️ Alerta: Saldo Negativo ⚠️",
      body: "O saldo atual está negativo: R$ " + saldo +
            "\n\nData e hora do envio: " + dataHora.toLocaleString()
    });

    // Exibe alerta confirmando envio
    SpreadsheetApp.getUi().alert("E-mail enviado com sucesso para: " + email);
  } else {
    // Exibe mensagem informando que o saldo está positivo
    SpreadsheetApp.getUi().alert("Saldo positivo. Nenhum e-mail enviado.");
  }
}
