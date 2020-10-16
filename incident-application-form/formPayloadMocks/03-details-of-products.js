module.exports = {
  detailsOfProductsPayload: () => {
    return {
      IncidentProducts: [
        // array of 1..n
        {
          // required
          // free form text
          // min 1
          // max 255
          // escaped
          Name: "example product name",
          // free form text
          // min 0
          // max 255
          // escaped
          Brand: "",
          // required
          // value of:
          //   - Alcoholic Beverages
          //   - Animal Feed
          //   - Bakery Products
          //   - Dairy Products
          //   - Eggs
          //   - Fats and Oils
          //   - Fish, Crustaceans and Molluscs
          //   - Fruit and Vegetables
          //   - Grain and Starch Products
          //   - Herbs and Spices
          //   - Meat and Meat Products
          //   - Non Alcoholic Beverages
          //   - Nuts and Seeds
          //   - Other
          //   - Prepared Meals and Dishes
          //   - Sugar and Chocolate Confectionery
          //   - Sugar, Preserves and Snacks
          //   - Take away food
          ProductTypeId: 25,
          // free form list of strings
          BatchCodes: [
            // free form text
            // min 1
            // max 255
            // escaped
            "11-22-33",
            "any text is fine here",
          ],
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
          CountryOfOriginId: 11,
          // free form text
          // min 0
          // max 255
          // escaped
          Amount: "",
          // required
          // one of:
          //   - Grams
          //   - Kg
          //   - Litres
          //   - Tonnes
          //   - Units
          AmountUnitTypeId: 3,
          IncidentProductDates: {
            // validated as ISO string
            BestBeforeDate: "",
            // validated as ISO string
            UseByDate: "2020-10-13T11:18:40.217Z",
            // validated as ISO string
            DisplayUntil: "",
          },
          IncidentProductPackSizes: {
            // free form text
            // min 0
            // max 255
            // escaped
            Size: "pack of 6",
          },
          // free form text
          // min 0
          // max 1024
          // escaped
          PackDescription: "",
          // free form text
          // min 0
          // max 1024
          // escaped
          AdditionalInfo:
            "Nec auctor eros tincidunt. Nam consequat neque sit amet rhoncus luctus. Nunc at tortor posuere, porttitor nisi ac, lacinia eros. Nam accumsan augue ac arcu tristique volutpat gravida at erat. Etiam at nibh sem. Nam nec turpis nisi. Curabitur a orci nec libero elementum commodo.",
          companies: [
            // array of 0..n
            {
              // required
              // one of:
              //   - Distributor
              //   - Importer
              //   - Retailer
              //   - Manufacturer
              FBOSTypes: "",
              // required
              // free form text
              // min 1
              // max 255
              // escaped
              Name: "An affected company Ltd.",
              Contact: {
                // free form text
                // min 1
                // max 255
                // escaped
                Name: "johnny example",
                // validated as email
                // max length > 255
                EmailAddress: "johnny@example.com",
                // numerical, whitespace, + sign, or empty
                // min 0
                // max 60
                TelephoneNumber: "",
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
                CountryID: 17,
              },
            },
          ],
        },
      ],
    };
  },
};
