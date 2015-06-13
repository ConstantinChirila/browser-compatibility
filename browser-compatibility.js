window.onload = function () { //its executed the script when the page finished loading
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer"
            },
            {
                string: navigator.userAgent,
                subString: "Trident",
                identity: "Explorer"
            },
            {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.userAgent,
                subString: "Safari",
                identity: "Safari"
            },
            {
                string: navigator.userAgent,
                subString: "Opera",
                identity: "Opera"
            }
        ]

    };

    BrowserDetect.init();

    //returns specific message based on the browser and its version
    //Chrome less then 21, Explorer less then 9 firefox less than 30, Opera less than 9, Safari less than 5
    if (((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 21)) || ((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 9)) || ((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 30)) || ((BrowserDetect.browser == 'Opera') && (BrowserDetect.version < 9)) || ((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5))) {
        document.getElementById("browserAlert").style.display = "block";
    };

    document.getElementById("closeAlert").onclick = function () {
        document.getElementById("browserAlert").style.display = "none";
    };
};