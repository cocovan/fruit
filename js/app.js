$(document).ready(function() {  
    var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas, The", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei ", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros ", "Congo, Democratic Republic of the", "Congo, Republic of the ", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland",                "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territories", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa ", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain ", "Sri Lanka", "Sudan", "Suriname", "Swaziland ", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand ", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
    $(".dropdown-toggle").dropdown();
    $("[rel=tooltip]").tooltip();
    $(".carousel").carousel({ interval: 3000 });
    $("#country").typeahead({ source: countries, items:5 });
    // some display manipulation to demo different styles and states of forms
    var $helpText = $("#countryHelpText");
    $("#registerBtn").click(function() {
        var country = $("#country").val();
        // nothing entered
        if (country.trim() == "") {
            $("#countryGroup").removeClass("success");
            $("#countryGroup").addClass("warning");
            $("#countryGroup").removeClass("error");
            $helpText.text("Please enter the country where you live");
        // country entered doesn't exist in our array
        } else if (jQuery.inArray(country, countries) < 0) {
            $("#countryGroup").removeClass("success");
            $("#countryGroup").removeClass("warning");
            $("#countryGroup").addClass("error");
            $helpText.text("Come on! " + country + "'s not even a real place! Is it? Please enter the correct country.");
        // is the UK!
        } else if(country == "United Kingdom") {
            $("#countryGroup").addClass("success");
            $("#countryGroup").removeClass("warning");
            $("#countryGroup").removeClass("error");
            $helpText.text("Correct! You live in the UK. Well done Team GB!");
        // selected the wrong country
        } else {
            $("#countryGroup").removeClass("success");
            $("#countryGroup").addClass("warning");
            $("#countryGroup").removeClass("error");
            $helpText.text("I know fine well you don't live in " + country + "! Please enter the correct country. Hint - it's the UK!");
        }
        return false;
    });
    // clear the warning messages
    $("#registerCancel").click(function() {
        $("#countryGroup").removeClass("success");
        $("#countryGroup").removeClass("warning");
        $("#countryGroup").removeClass("error");
        $helpText.text("");
        return false;
    });
    // set the selected menu link to be active
    var $menuLink = $("ul.nav li");
    $($menuLink).click(function() {
        $($menuLink).removeClass("active");
        $(this).addClass("active");
    });
});    