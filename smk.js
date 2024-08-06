(($) => {
    $(() => {
        if ($("button:visible:contains('Dodaj kopię')").length < 1) {
            alert('Brak aktywnego listy do wprowadzania danych');
            return;
        }

        if ($("button:visible:contains('Dodaj kopię')").length > 1) {
            alert('Aktywne może być tylko jedno okno do wprowadzania - zwiń pozostałe!');
            return;
        }

        $("button:visible:contains('Dodaj kopię')").each(function(index, button) {
            chrome.storage.local.get('importData', function (items) {
                let importData = items.importData;
                importData.forEach(function(el, index) {
                    $(button).click();
                    setTimeout(function() {
                        let tr = $(".H:visible table tbody tr").eq(index);

                        let dateInput = tr.find("td").eq(1).find("input");
                        $(dateInput).val(el.date);
                        dateInput[0].dispatchEvent(new Event('change', { 'bubbles': true }))

                        let initialsInput = tr.find("td").eq(8).find("input");
                        $(initialsInput).val(el.initials);
                        initialsInput[0].dispatchEvent(new Event('change', { 'bubbles': true }))

                        let sexSelect = tr.find("td").eq(9).find("select");
                        $(sexSelect).find('option[value="' + el.sex +'"]').attr('selected', 'selected');
                        sexSelect[0].dispatchEvent(new Event('change', { 'bubbles': true }))

                        if (el.operator) {
                            let operatorInput = tr.find("td").eq(5).find("input");
                            $(operatorInput).val(el.operator);
                            operatorInput[0].dispatchEvent(new Event('change', { 'bubbles': true }))
                        }

                        if (el.assist) {
                            let assistInput = tr.find("td").eq(10).find("input");
                            $(assistInput).val(el.assist);
                            assistInput[0].dispatchEvent(new Event('change', { 'bubbles': true }))
                        }

                        if (el.group) {
                            let groupInput = tr.find("td").eq(11).find("input");
                            $(groupInput).val(el.group);
                            groupInput[0].dispatchEvent(new Event('change', { 'bubbles': true }))
                        }
                    }, 100);
                });
            });
        });
    });
})(jQuery);