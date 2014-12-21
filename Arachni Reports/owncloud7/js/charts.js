function index_to_shortname( index ){
    return ["hsts","private_ip","password_autocomplete","common_files","interesting_responses","emails","html_objects","insecure_cookies"][index];
}

function index_to_severity( index ){
    return {"hsts":"medium","private_ip":"low","password_autocomplete":"low","common_files":"low","interesting_responses":"informational","emails":"informational","html_objects":"informational","insecure_cookies":"informational"}[index_to_shortname(index)];
}

jQuery(function ($) {
    c3.generate({
        bindto: '#chart-issues',
        data: {
            columns: [
                ["Trusted",1,3,1,1,25,11,1,1],
                ["Untrusted",0,0,0,0,0,0,0,0],
                ["Severity",18,12,12,12,6,6,6,6]
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
        regions: [{"class":"severity-medium","start":0,"end":0},{"class":"severity-low","start":1,"end":3},{"class":"severity-informational","start":4}],
        axis: {
            x: {
                type: 'category',
                categories: ["Missing 'Strict-Transport-Security' header","Private IP address disclosure","Password field with auto-complete","Common sensitive file","Interesting response","E-mail address disclosure","HTML object","Insecure cookie"],
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
                categories: [6,12,18,24],
                tick: {
                    format: function (d) {
                        return ["informational","low","medium","high"][(d - 6) / 6]
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
            columns: [["Trusted",44],["Untrusted",0]]
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
            columns: [["form",1],["cookie",1],["body",15],["server",27]]
        }
    });

    c3.generate({
        bindto: '#chart-severities',
        data: {
            type: 'pie',
            columns: [["medium",1],["low",5],["informational",38]]
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
