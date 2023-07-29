import $ from 'jquery'
import router from '@/router';
import store from "@/state/store";
import {useNotification} from "@kyvg/vue3-notification";

const {notify} = useNotification();

export function formatMoney(id) {
    const value = document.getElementById(id).value;
    // Remove todos os caracteres que não sejam dígitos
    if (value === '') return;

    var cleanValue = value.replace(/\D/g, '');

    // Divide o valor em parte inteira e decimal
    var integerPart = cleanValue.substring(0, cleanValue.length - 2);
    const verify = integerPart.charAt(0);
    if (parseInt(integerPart) > 1 && verify[0] === '0') integerPart = integerPart.slice(1);
    if (integerPart === '' || integerPart == 0) integerPart = '0';
    var decimalPart = cleanValue.substring(cleanValue.length - 2);
    if (decimalPart.length < 2) decimalPart = '0' + decimalPart;

    // Adiciona separador de milhar
    integerPart = integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1.');

    // Formata o valor como moeda (adiciona símbolo de moeda e sinal de negativo)
    const format = 'R$ ' + integerPart + ',' + decimalPart;
    return document.getElementById(id).value = format;
}

export function getUrl(paramns) {
    let url = '?';

    const keys = Object.keys(paramns);

    for (let i = 0; i < keys.length; i++) {
        if (i > 0) url += '&';
        let result = paramns[keys[i]];
        url += `${keys[i]}=${result}`;
    }

    return url;
}

export function showLoading(page, loadind) {
    document.getElementById(loadind).style.display = 'block';
    document.getElementById(page).style.opacity = '.2';
}

export function closeLoading(page, loadind) {
    setTimeout(() => {
        document.getElementById(loadind).style.display = 'none';
        document.getElementById(page).style.opacity = '1';
    }, 300)
}

export function startLoading(id, button) {
    document.getElementById('spinner').style.display = 'block';
    document.getElementById(id).style.opacity = '.2';
    if (button) document.getElementById(button).setAttribute('disabled', true);
}

export function endLoading(id, button) {
    setTimeout(function () {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById(id).style.opacity = '1';
        if (button) document.getElementById(button).removeAttribute('disabled');
    }, 300)
}

export function formDataToJson(id) {
    var $form = $(`#${id}`);
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n) {
        if (n['name'].indexOf("[]") != -1) {// é um multiselect
            let field = n['name'].replace("[]", "");
            if (indexed_array[field] == undefined) {
                indexed_array[field] = [];
            }
            indexed_array[field].push(n['value']);
        } else {
            indexed_array[n['name']] = n['value'];
        }
    });
    return indexed_array;
}

export function Forbidden(response) {
    if (response.status === 500 && (response.data.message === 'Sessão expirada!' || response.data.message === 'Acesso Negado!')) {
        localStorage.removeItem('jwt');
        router.push({
            name: 'login'
        })
    }

    if (response.status === 500 && response.data.message === 'Acesso negado!') {
        router.push({
            name: 'dashboard'
        })
    }
}

export function showNotify(response) {
    if (response.status === 200) {
        notifySuccess(response.data.message);
    } else {
        console.log(response);
        Forbidden(response)
        notifyError(response.data.message);
    }
}

export function ValidateForm(id) {
    const form = document.getElementById(id);
    form.classList.add('was-validated');
    const inputs = form.getElementsByClassName('form-control');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '' &&
            (inputs[i].getAttribute('required') === '' || inputs[i].getAttribute('required') === true)) {
            notifyError('Preencha todos os campos obrigatórios!')
            return false;
        }
    }

    return true;
}

export function notifyError(messsage) {
    notify({
        title: `<i class='bx bx-error'></i>` + messsage,
        position: 'bottom center',
        type: 'error',
        speed: 300,
        duration: 3000,
    });
}

export function notifySuccess(messsage) {
    notify({
        title: `<i class='bx bx-check-circle'></i>` + messsage,
        position: 'bottom center',
        type: 'success',
        speed: 300,
        duration: 3000,
    });
}

export function newOrder(order, session) {
    let obj = JSON.parse(localStorage.getItem(session))

    let icons = document.querySelectorAll('th i');
    for (let i = 0; i < icons.length; i++) {
        console.log(icons[i])
        icons[i].style.opacity = '1';
    }

    let upper = order.substring(2);
    upper = upper.charAt(0).toUpperCase() + upper.slice(1);

    if (obj.paramns.order === order) {
        let seq = obj.paramns.seq;
        seq = seq.charAt(0).toUpperCase() + seq.slice(1);
        const id = 'icon' + upper + seq;

        console.log(id)

        document.getElementById(id).style.opacity = '0';

        obj.paramns.seq = obj.paramns.seq === 'asc' ? 'desc' : 'asc';
    } else {
        const id = 'icon' + upper + 'Desc';
        console.log(id)
        document.getElementById(id).style.opacity = '0';

        obj.paramns.seq = 'asc';
        obj.paramns.order = order;
    }

    localStorage.setItem(session, JSON.stringify(obj));

    let get = obj.module + 'GET_' + session.toUpperCase();
    store.dispatch(get);

}

export function loadAddress() {
    var cep = $('#zipCode').val().replace(/\D/g, '');
    var validacep = /^[0-9]{8}$/;
    if (validacep.test(cep)) {
        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
            if (!("erro" in dados)) {
                $("#neighborhood").val(dados.bairro);
                $("#address").val(dados.logradouro);
                $("#complement").val(dados.complemento);
                $("#city").val(dados.localidade);
                $("#state").val(dados.uf);
            }
        });
    }
}

export function maskCpfCnpj(value) {

    if (value.length <= 11) {
        return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
        return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
}

export function getModalValues(data, form, button) {
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        const input = document.getElementById(keys[i]);
        if (input && data[keys[i]] != '') input.value = data[keys[i]];
    }
    endLoading(form, button);
}

export function opacityByTag(id, tag, opacity, spinner ,display) {
    const y = document.getElementById(spinner);
    if (y) y.style.display = display;
    const x = document.getElementById(id);
    if (x) {
        const a = x.getElementsByTagName(tag);
        for (let i = 0; i < a.length; i++) {
            a[i].style.opacity = opacity;
        }
    }
}

export function moneyToFloat(string) {
    string = string.replace('R$ ', '');
    string = string.replaceAll('.', '');
    return  parseFloat(string.replaceAll(',', '.'));
}