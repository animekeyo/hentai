async function theme(name) {
    try {
        var namex = 'tx-' + name;
        var themex = geti(namex)
        var data
        if (themex) {
            fetch('/theme/' + name + '.html')
                .then(o => o.text())
                .then((o) => {
                    seti(namex, o)
                });
            data = themex
        } else {
            data = await fetch('/theme/' + name + '.html')
                .then(o => o.text());
            seti(namex, data)
        }

        $(name).replaceWith(data);
    } catch (error) {
        return null
    }
}

function seti(location, data) {
    localStorage.setItem(location, data)
    return localStorage.getItem(location)
}

function setii(location, data) {
    localStorage.setItem(location, data)
}

function removei(location) {
    localStorage.removeItem(location);
}

function geti(location) { return localStorage.getItem(location) }

function go(val) {
    if (val) {
        window.location.href = val;
    }
}

///////
///////

////////
async function items(check, no, page) {
    try {
        var link;
        if (page) {
            page = page;
        } else {
            page = 1;
        }
        if (no === false) {
            link = `?page=${page}`
        } else if (no) {
            link = `?id=${no}`
        } else {
            link = `?page=${page}`
        }
        if (check === true && check === false) {

        } else if (check) {
            link = link + `&q=${check}`
        }
        var data;
        var namexx = 'itemsx-' + link;
        var data_check = geti(namexx);
        if (data_check) {
            fetch('https://api.buybani.com/' + link)
                .then(o => o.json())
                .then((o) => {
                    seti(namexx, JSON.stringify(o))
                })
            data = JSON.parse(data_check)
        } else {
            data = await fetch('https://api.buybani.com/' + link)
                .then(o => o.json())
            seti(namexx, JSON.stringify(data))
        }

        var dara = [];
        for (const e of data.data) {
            dara.push({
                id: Number(e.id),
                name: e.name,
                cover: e.cover,
                imgs: e.imgs,
                decs: e.decs,
                price: Number(e.price),
                pricex: Number(e.price).toLocaleString(),
                min: Number(e.min),
                max: Number(e.max),
            })
        }
        return dara
    } catch (error) {

    }
}
async function localtoitems(name, check) {
    try {
        const namex = JSON.parse(geti(name));
        if (namex && namex.length > 0) {
            var data = [];
            for await (let e of namex) {
                const datax = await items(true, e.id);
                if (check) {
                    var dara = datax[0];
                    dara.q = e.q
                    data.push(dara)
                } else {
                    data.push(datax[0])
                }

            }
            return data
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}
async function removePush(name, id) {
    try {
        var check = geti(name);

        const name_data = JSON.parse(check);
        var data = []
        for await (const e of name_data) {
            if (e.id === id) {

            } else {
                data.push(e)
            }
        }
        const send = seti(name, JSON.stringify(data));
        return send;
    } catch (error) {

    }
}
async function addpush(name, data) {
    try {
        const name_data = geti(name);
        if (name_data) {
            const json = JSON.parse(name_data);
            json.push(data)
            const get_data = seti(name, JSON.stringify(json));
            return get_data;
        } else {
            const get_data = seti(name, JSON.stringify([data]));
            return get_data;
        }
    } catch (error) {
        console.log(error)
    }
}
async function element(name, data, name2) {
    try {
        var namex = 'txx-' + name;
        var themex = geti(namex)
        var vdata;
        if (themex) {
            fetch('/theme/' + name + '.html')
                .then(o => o.text()).then((o) => {
                    seti(namex, o)
                });
            vdata = themex;
        } else {
            vdata = await fetch('/theme/' + name + '.html')
                .then(o => o.text());
            seti(namex, vdata);
        }


        removei('replace')
        seti('replace', vdata);
        for (var e in data) {
            for (var ee in data[e]) {
                const v2 = geti('replace');
                const data2 = v2.replaceAll(`[[${ee}]]`, data[e][ee])
                setii('replace', data2)
            }
        }
        if (name2) {
            $(name2).replaceWith(geti('replace'));
        }
        return geti('replace');
    } catch (error) {
        console.log(error)
    }
}

function removeE(time) {
    $('[id="' + time + '"]').removei()
}
async function item_count(name) {
    try {
        const data = JSON.parse(geti(name));
        if (data) {
            return data.length;
        } else {
            return 0
        }
    } catch (error) {
        console.log(error)
    }
}