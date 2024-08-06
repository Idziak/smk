(($) => {
    $(() => {
        let data = [];
        let containerError = $("#containerError");
        $('#buttonStep1').click(function () {
            containerError.hide();
            data = $("#dataInput").val();
            data = data.split("\n");

            data.forEach(function (el, index) {
                let dataRow = el.split("\t");
                if (dataRow.length === 1) {
                    delete data[index];
                    return;
                }
                data[index] = dataRow;
                let row = $("<tr/>");
                $("#dataTable tbody").append(row);
                data[index].forEach(function (el) {
                    let td = $("<td/>").text(el);
                    $(row).append(td);
                });
            });

            if (data.length > 100) {
                showError("Możesz wprowadzić maksymalnie 100 rekordów, aktualna ilość " + data.length);
                return;
            }

            let headerSelect = $("#headerSelectExample").clone();
            data[0].forEach(function(el, index) {
                let headerTd = $("<td/>").append(
                    $(headerSelect).clone().attr({
                        name : $(headerSelect).attr('name').replace(/__replace__/, index),
                        id : "headerSelect" + index
                    }).show()
                );
                $("#dataTable thead tr").append(headerTd);
            });
            $("#containerStep1").hide();
            $("#recordCount").text(data.length);
            if (data.length > 100) {
                $("#recordCount").addClass("badge bg-danger");
            } else {
                $("#recordCount").removeClass("badge bg-danger");
            }
            $("#containerStep2").show();
        });

        $("#buttonStep2").click(function() {
            containerError.hide();
            let settings = {};
            $("#dataTable thead tr td select").each(function (index, node) {
                if ($(this).val() !== "") {
                    let settingName = $(this).val();
                    settings[settingName] = index;
                }
            });

            if (typeof settings.namesurname === "undefined"
                && typeof settings.surnamename === "undefined") {
                showError("Musisz wybrać imię i nazwisko pacjenta");
                return;
            }

            if (typeof settings.date === "undefined") {
                showError("Musisz wybrać datę");
                return;
            }

            let dataToSend = [];

            data.forEach(function(row, rowIndex) {
                let namesurname = null;
                let sex = null;
                if (typeof settings.namesurname !== "undefined") {
                    namesurname = row[settings.namesurname];
                    sex = getSex(namesurname.replace(/ .*/,''));
                } else {
                    namesurname = row[settings.surnamename];
                    sex = getSex(namesurname.replace(/.* /,''));
                }
                let initials = namesurname.split(' ')
                    .map(word => word[0])
                    .join('');
                let date = row[settings.date];
                let operator = null;
                let assist = null;
                let group = null;

                if (typeof settings.operator !== "undefined") {
                    operator = row[settings.operator];
                }

                if (typeof settings.assist !== "undefined") {
                    assist = row[settings.assist];
                }

                if (typeof settings.group !== "undefined") {
                    group = row[settings.group];
                }

                let data = {
                    initials,
                    sex,
                    date,
                    operator,
                    assist,
                    group
                };
                dataToSend.push(data);
            });

            chrome.storage.local.set({"importData" : dataToSend})
            chrome.tabs.query({active: true, currentWindow: true})
                .then(([tab]) => {
                    window.close();
                    chrome.scripting.executeScript(
                        {
                            target: {tabId: tab.id},
                            files: ['smk.js'],
                        })
                })
                .catch((message) => {
                    showError(message)
                });
        });

        let uniqueNames = [];
        const showError = function (message) {
            containerError.show();
            $("#containerError .alert").text(message);
        };
        const getSex = function (name) {
            switch (name) {
                case 'Jacek':
                case 'Wiktor':
                case 'Piotr':
                case 'Roman':
                case 'Andrzej':
                case 'Bartłomiej':
                case 'Kazimierz':
                case 'Bernard':
                case 'Tomasz':
                case 'Krzysztof':
                case 'Ryszard':
                case 'Stanisław':
                case 'Daniel':
                case 'Marcel':
                case 'Dariusz':
                case 'Sławomir':
                case 'Bolesław':
                case 'Eugeniusz':
                case 'Patryk':
                case 'Józef':
                case 'Zenon':
                case 'Alojzy':
                case 'Stefan':
                case 'Jan':
                case 'Marian':
                case 'Romuald':
                case 'Paweł':
                case 'Zygmunt':
                case 'Czesław':
                case 'Grzegorz':
                case 'Marcin':
                case 'Walerian':
                case 'Marek':
                case 'Jerzy':
                case 'Mirosław':
                case 'Henryk':
                case 'Bartosz':
                case 'Wojciech':
                case 'Remigiusz':
                case 'Zdzisław':
                case 'Bronisław':
                case 'Łukasz':
                case 'Leszek':
                case 'Zygfryd':
                case 'Michał':
                case 'Seweryn':
                case 'Janusz':
                case 'Damazy':
                case 'Lucjan':
                case 'Vladyslav':
                case 'Karol':
                case 'Emnund':
                case 'Antoni':
                case 'Wacław':
                case 'Mariusz':
                case 'Edmund':
                case 'Maciej':
                case 'Ambroży':
                case 'Rafał':
                case 'Adam':
                case 'Aleksander':
                case 'Włodzimierz':
                case 'Władysław':
                case 'Tadeusz':
                case 'Przemysław':
                case 'Wiesław':
                case 'Ireneusz':
                case 'Bogusław':
                case 'Robert':
                case 'Zbigniew':
                case 'Jarosław':
                case 'Damian':
                case 'Edward':
                case 'Waldemar':
                case 'Lech':
                case 'Bogdan':
                case 'Lechosław':
                case 'Łucjan':
                case 'Sylwester':
                case 'Ferdynand':
                case 'Artur':
                case 'Mieczysław':
                case 'Longin':
                case 'Witold':
                case 'Kamil':
                case 'Leonard':
                case 'Adrian':
                case 'Bogumił':
                case 'Adelward':
                case 'Mateusz':
                case 'Maksymilian':
                case 'Hieronim':
                case 'Arkadiusz':
                case 'Ignacy':
                case 'Szymon':
                case 'Radosław':
                case 'Sebastian':
                case 'Krystian':
                case 'Oskar':
                    return "M";
                case 'Alina':
                case 'Lidia':
                case 'Kamila':
                case 'Anna':
                case 'Joanna':
                case 'Elżbieta':
                case 'Marta':
                case 'Jadwiga':
                case 'Janina':
                case 'Maria':
                case 'Monika':
                case 'Izabela':
                case 'Magdalena':
                case 'Małgorzata':
                case 'Iwona':
                case 'Hanna':
                case 'Paulina':
                case 'Barbara':
                case 'Dorota':
                case 'Henryka':
                case 'Katarzyna':
                case 'Klaudia':
                case 'Alicja':
                case 'Zofia':
                case 'Michalina':
                case 'Irena':
                case 'Renata':
                case 'Ewa':
                case 'Emilia':
                case 'Jolanta':
                case 'Krystyna':
                case 'Kazimiera':
                case 'Teresa':
                case 'Grażyna':
                case 'Danuta':
                case 'Justyna':
                case 'Halina':
                case 'Helena':
                case 'Beata':
                case 'Genowefa':
                case 'Aniela':
                case 'Sabina':
                case 'Agnieszka':
                case 'Patrycja':
                case 'Daria':
                case 'Regina':
                case 'Julia':
                case 'Bogumiła':
                case 'Donata':
                case 'Bożena':
                case 'Sylwia':
                case 'Nadzieja':
                case 'Marzena':
                case 'Aldona':
                case 'Liudmyla':
                case 'Marianna':
                case 'Judyta':
                case 'Czesława':
                case 'Mariola':
                case 'Władysława':
                case 'Longina':
                case 'Mirosława':
                case 'Aleksandra':
                case 'Aneta':
                case 'Józefa':
                case 'Honorata':
                case 'Arleta':
                case 'Stanisława':
                case 'Bogusława':
                case 'Bernadeta':
                case 'Luiza':
                case 'Daniela':
                case 'Klaudyna':
                case 'Natalia':
                case 'Bernardyna':
                case 'Eugenia':
                case 'Karina':
                case 'Karolina':
                case 'Teofila':
                case 'Urszula':
                case 'Romana':
                case 'Seweryna':
                case 'Gabriela':
                case 'Weronika':
                case 'Marzanna':
                case 'Sandra':
                case 'Wanda':
                case 'Róża':
                case 'Violetta':
                case 'Agata':
                case 'Bernarda':
                case 'Zuzanna':
                case 'Kinga':
                case 'Romualda':
                case 'Olga':
                case 'Edyta':
                case 'Tatiana':
                case 'Adriana':
                case 'Aurelia':
                case 'Cyryla':
                case 'Yurkie':
                case 'Włodzimiera':
                case 'Antonina':
                case 'Teodozja':
                case 'Zdzisława':
                case 'Wioletta':
                case 'Dominika':
                case 'Angelika':
                case 'Marlena':
                case 'Even':
                case 'Mieczysława':
                case 'Mierosława':
                case 'Ludmira':
                case 'Bronisława':
                case 'Walentyna':
                case 'Zenobia':
                case 'Kamilla':
                case 'Wioleta':
                case 'Amanda':
                case 'Ligia':
                case 'Milena':
                case 'Dioniza':
                case 'Nina':
                case 'Yevheniya':
                case 'Ewelina':
                case 'Adela':
                case 'Izabella':
                case 'Lucjana':
                case 'Marika':
                case 'Balbina':
                case 'Felicja':
                case 'Fatima':
                case 'Stefania':
                case 'Julita':
                case 'Eleonora':
                case 'Marita':
                case 'Malwina':
                case 'Dagmara':
                case 'Filomena':
                case 'Wiesława':
                case 'Lucyna':
                case 'Elwira':
                case 'Lucjanna':
                    return "K";
                default:
                    if (!uniqueNames.includes(name)) {
                        uniqueNames.push(name);
                    }
                    return "M";
            }
        };
    });
})(jQuery);