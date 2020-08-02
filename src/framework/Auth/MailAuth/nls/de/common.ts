const messages = {
  codeName: 'Verifizierungs Token',

  messageSubject: '_{iss} _{codeName}',
  messageHeader: 'Möchtest Du dich mit _{iss} anmelden?',
  messageBody: 'Falls Du dich gerade mit _{iss} einloggen wolltest, hier ist dein token :',
  messageAsText: '[token als text] : ',
  messageValid: 'Dieses _{codeName} ist gültig bis _{exp}',
  messageFooter: 'Copyright &copy; Menschen des IndieWebs.',

  messageForm: 'Wir haben dir eine mail gesendet.<br>Gib das _{codeName} ein',
  messageFormValid: 'Du hast Zeit bis _{exp}',
  messageFormRemain: '_{sec} Sekunden verbleiben',
  messageFormExpired: 'Die Zeit ist leider abgelaufen.',
  messageFormSubmitted: 'Wir überprüfen das _{codeName} ...',

  missingProp: 'Fehlende Eigenschaft:',
  missingTo: 'Empänger fehlt: Kein "to" oder "req.query.authorize" gefunden',
  rejected: 'Die eMail wurde zurückgewiesen !'
};

export default messages;
