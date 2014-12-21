function index_to_shortname( index ){
    return ["csrf","backdoors","backup_directories","backup_files","hsts","common_directories","password_autocomplete","common_files","private_ip","emails","html_objects","interesting_responses","form_upload","http_only_cookies","insecure_cookies"][index];
}

function index_to_severity( index ){
    return {"csrf":"high","backdoors":"high","backup_directories":"medium","backup_files":"medium","hsts":"medium","common_directories":"medium","password_autocomplete":"low","common_files":"low","private_ip":"low","emails":"informational","html_objects":"informational","interesting_responses":"informational","form_upload":"informational","http_only_cookies":"informational","insecure_cookies":"informational"}[index_to_shortname(index)];
}

jQuery(function ($) {
    c3.generate({
        bindto: '#chart-issues',
        data: {
            columns: [
                ["Trusted",7,5,65,215,1,305,5,10,4,2,1,25,1,1,1],
                ["Untrusted",0,0,26,66,0,1,0,40,0,0,0,0,0,0,0],
                ["Severity",304,304,228,228,228,228,152,152,152,76,76,76,76,76,76]
            ],
            axes: {
                Severity: 'y2'
            },
            type: 'bar',
            groups: [
                ['Trusted', 'Untrusted']
            ],
            types: {
                Severity: 'line'
            },
            onclick: function (d) {
                var location;

                if( d.name.toLowerCase() == 'severity' ) {
                    location = 'summary/issues/trusted/severity/' + index_to_severity(d.x);
                } else {
                    location = 'summary/issues/' + d.name.toLowerCase() + '/severity/' +
                        index_to_severity(d.x) + '/' + index_to_shortname(d.x);
                }

                goToLocation( location );
            }
        },
        regions: [{"class":"severity-high","start":0,"end":1},{"class":"severity-medium","start":2,"end":5},{"class":"severity-low","start":6,"end":8},{"class":"severity-informational","start":9}],
        axis: {
            x: {
                type: 'category',
                categories: ["Cross-Site Request Forgery","A backdoor file exists on the server","Backup directory","Backup file","Missing 'Strict-Transport-Security' header","Common directory","Password field with auto-complete","Common sensitive file","Private IP address disclosure","E-mail address disclosure","HTML object","Interesting response","Form-based File Upload","HttpOnly cookie","Insecure cookie"],
                tick: {
                    rotate: 15
                }
            },
            y: {
                label: {
                    text: 'Amount of logged issues',
                    position: 'outer-center'
                }
            },
            y2: {
                label: {
                    text: 'Severity',
                    position: 'outer-center'
                },
                show: true,
                type: 'category',
                categories: [76,152,228,304],
                tick: {
                    format: function (d) {
                        return ["informational","low","medium","high"][(d - 76) / 76]
                    }
                }
            }
        },
        padding: {
            bottom: 40
        },
        color: {
            pattern: [ '#1f77b4', '#d62728', '#ff7f0e' ]
        }
    });

    c3.generate({
        bindto: '#chart-trust',
        data: {
            type: 'pie',
            columns: [["Trusted",648],["Untrusted",133]]
        },
        pie: {
            onclick: function (d) { goToLocation( 'summary/issues/' + d.id.toLowerCase() ) }
        },
        color: {
            pattern: [ '#1f77b4', '#d62728' ]
        }
    });

    c3.generate({
        bindto: '#chart-elements',
        data: {
            type: 'pie',
            columns: [["form",13],["cookie",2],["header",1],["body",6],["server",759]]
        }
    });

    c3.generate({
        bindto: '#chart-severities',
        data: {
            type: 'pie',
            columns: [["high",12],["medium",679],["low",59],["informational",31]]
        },
        color: {
            pattern: [ '#d62728', '#ff7f0e', '#ffbb78', '#1f77b4' ]
        },
        pie: {
            onclick: function (d) {
                goToLocation( 'summary/issues/trusted/severity/' + d.id );
            }
        }
    });

});
