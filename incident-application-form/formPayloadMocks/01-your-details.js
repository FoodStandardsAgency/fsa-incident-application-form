module.exports = {
  yourDetailsPayload: () => {
    return {
      Incidents: {
        // required
        // one of:
        //   - industry
        //   - local-authority
        NotifierID: "local-authority",
      },
      IncidentStakeholders: {
        // required
        // free form text
        // min 1
        // max 255
        // escaped
        Name: "timmy tester",
        // free form text
        // min 0
        // max 255
        // escaped
        Role: "Technical manager",
        // free form text
        // min 0
        // max 255
        // escaped
        GovDept: "My company name Ltd.",
        // required
        // validated as email
        // max length > 255
        Email: "timmy@example.com",
        // required
        // numerical, whitespace, + sign
        // max 60
        Phone: "+44 1772 123 456",
      },
      Addresses: {
        // required
        // free form text
        // min 1
        // max 255
        // escaped
        AddressLine1: "123 Fake test street",
        // free form text
        // min 0
        // max 255
        // escaped
        AddressLine2: "",
        // required
        // free form text
        // min 1
        // max 255
        // escaped
        TownCity: "Any text here",
        // free form text
        // min 0
        // max 255
        // escaped
        County: "",
        // free form text
        // min 0
        // max 255
        // escaped
        Postcode: "",
        // required
        // value of:
        //   - United Kingdom
        //   - Argentina
        //   - Australia
        //   - Austria
        //   - Bangladesh
        //   - Belgium
        //   - Bolivia
        //   - Brazil
        //   - Bulgaria
        //   - Burma
        //   - Cambodia
        //   - Canada
        //   - Chile
        //   - China
        //   - Costa Rica
        //   - Croatia
        //   - Cyprus
        //   - Czech Republic
        //   - Denmark
        //   - Dominican Republic
        //   - Egypt
        //   - England
        //   - Estonia
        //   - Finland
        //   - France
        //   - Gambia
        //   - Georgia
        //   - Germany
        //   - Ghana
        //   - Greece
        //   - Guyana
        //   - Holland
        //   - India
        //   - Indonesia
        //   - Iran
        //   - Israel
        //   - Italy
        //   - Ivory Coast
        //   - Jamaica
        //   - Japan
        //   - Kenya
        //   - Korea
        //   - Latvia
        //   - Lebanon
        //   - Lithuania
        //   - Luxembourg
        //   - Malawi
        //   - Malaysia
        //   - Maldives
        //   - Malta
        //   - Mexico
        //   - Morocco
        //   - Mozambique
        //   - Myanmar
        //   - New Zealand
        //   - Nigeria
        //   - Northern Ireland
        //   - Norway
        //   - Pakistan
        //   - Peru
        //   - Philippines
        //   - Poland
        //   - Portugal
        //   - Republic of Ireland
        //   - Romania
        //   - Russia
        //   - Saudi Arabia
        //   - Scotland
        //   - Sierra Leone
        //   - Slovenia
        //   - South Africa
        //   - South Korea
        //   - Spain
        //   - Sri Lanka
        //   - Suriname
        //   - Sweden
        //   - Switzerland
        //   - Syria
        //   - Taiwan
        //   - Thailand
        //   - The Netherlands
        //   - Tonga
        //   - Turkey
        //   - Uganda
        //   - USA
        //   - Vietnam
        //   - Wales
        //   - West Africa
        //   - Zimbabwe
        CountryID: "17",
      },
    };
  },
};
