async function addtofav(id, checkx, check) {
    try {
        var id = Number(id)
        var favs = geti('favs');
        var div = $('.favs[id="' + id + '"]');
        if (favs) {
            var checkxx = JSON.parse(favs)
            for await (const e of checkxx) {
                if (e.id === id) {
                    check = true
                }
            }
        } else {
            check = null
        }

        if (checkx) {
            if (check) {
                div.addClass('favxxx');
            } else {
                div.removeClass('favxxx');
                removePush('favs', id);
            }
        } else {
            if (check) {
                div.removeClass('favxxx');
                removePush('favs', id);
            } else {
                await addpush('favs', {
                    id
                });
                div.addClass('favxxx');
            }
        }
    } catch (error) {
        console.log(error)
    }
}

async function addtocart(id, checkx, q, check, check2) {
    try {
        var id = Number(id)
        var cart = geti('cart');
        const div = $('.cartview[id="' + id + '"]');
        if (cart) {
            var checkxx = JSON.parse(cart)
            for await (const e of checkxx) {
                if (e.id === id) {
                    check = true
                }
            }
        } else {
            check = null
        }

        if (checkx) {
            if (check) {
                div.text('shopping_basket').attr('onclick', `go('/cart');`)
            } else {
                removePush('cart', id);
                div.text('add').attr('onclick', `addtocart('${id}',false,'${q}');`)
            }
        } else {
            if (check) {
                removePush('cart', id);
                div.text('add').attr('onclick', `addtocart('${id}',false,'${q}');`)
            } else {
                await addpush('cart', {
                    id,
                    q: Number(q)
                });
                div.text('shopping_basket').attr('onclick', `go('/cart');`)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
async function total() {
    try {
        const data = await localtoitems('cart', true);
        setii('total', 0)
        if (data) {
            for await (const e of data) {
                const price = e.price * Number(e.q);
                const total = Number(geti('total')) + Number(price)
                setii('total', total)
            }
            return geti('total');
        } else {
            return null
        }
    } catch (error) {

    }
}

async function loadtotal(check) {
    try {
        const data = await total();
        if (check) {
            return Number(data) + 40
        } else {
            $('.total').text(`Rs ${Number(data).toLocaleString()}`)
            return data
        }

    } catch (error) {

    }
}
async function addq(id, min, max, check) {
    try {
        var checkx;
        var input = $('input[id="' + id + '"]');
        var val = Number(input.val());
        if (check) {
            val = val + 1
            if (val > Number(min)) {
                val = Number(min)
            }
        } else {
            val = val - 1
            if (val < Number(max)) {
                val = Number(max)
            }
        }
        input.val(val)
        await removePush('cart', Number(id));
        await addpush('cart', {
            id: Number(id),
            q: `${val}`
        });
        console.log(val)
    } catch (error) {
        console.log(error)
    }
}
async function apply_q_input(id) {
    try {
        var input = $('input[id="' + id + '"]');
        var cart = geti('cart');
        if (cart) {
            cart = JSON.parse(cart);
            for await (const e of cart) {
                if (Number(e.id) === Number(id)) {
                    input.val(e.q)
                }
            }
        }
        console.log(val)
    } catch (error) {
        console.log(error)
    }
}