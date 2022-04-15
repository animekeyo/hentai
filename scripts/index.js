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