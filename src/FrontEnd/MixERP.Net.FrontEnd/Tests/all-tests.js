﻿///#source 1 1 /Tests/dom/cascading-pair.js
///<reference path="/Scripts/jquery-1.9.1.js" />
///<reference path="/Scripts/mixerp/mixerp-core.js" />
QUnit.test("cascading-pair.js -> createCascadingPair", function (assert) {
    var destinations = ['Mugu', 'Langtang', 'Annapurna', 'Pumori', 'Denver', 'Las Vegas'];
    var select = $("<select  id='DesintaionSelect' />").hide();
    var input = $("<input type='text' id='DestinationInput' />").hide();

    $.each(destinations, function (index, value) {
        select.append($('<option/>', {
            value: value,
            text: value
        }));
    });

    //Append the pair to document
    $('body').append(select).append(input);


    createCascadingPair(select, input);



    destinations = destinations.sort(function () { return 0.5 - Math.random() });

    $.each(destinations, function (index, value) {
        window.shouldEqualByInput(value, assert, input, select);
    });

    destinations = destinations.sort(function () { return 0.5 - Math.random() });

    $.each(destinations, function (index, value) {
        window.shouldEqualBySelect(value, assert, input, select);
    });

    destinations = ['Mississippi', 'Nilgiri', 'Lhotse', 'Texas', 'Colorado', 'St. Austin'];

    $.each(destinations, function (index, value) {
        window.shouldNotEqualByInput(value, assert, input, select);
    });

    destinations = destinations.sort(function () { return 0.5 - Math.random() });

    $.each(destinations, function (index, value) {
        window.shouldNotEqualBySelect(value, assert, input, select);
    });

    select.remove();
    input.remove();
});


function shouldEqualByInput(expected, assert, input, select) {
    input.val(expected);
    input.trigger('blur');

    var actual = select.find("option:selected").val();

    assert.equal(expected, actual, "The pair cascaded on input event to value \"" + expected + "\".");
};

function shouldNotEqualByInput(unexpected, assert, input, select) {
    input.val(unexpected);
    input.trigger('blur');

    var actual = select.find("option:selected").val();

    assert.notEqual(unexpected, actual, "The pair did not cascade on input event to an invalid value \"" + unexpected + "\".");
};

function shouldEqualBySelect(expected, assert, input, select) {
    select.val(expected);
    select.trigger('change');

    actual = input.val();

    assert.equal(expected, actual, "The pair cascaded on select event to value \"" + expected + "\".");
};

function shouldNotEqualBySelect(unexpected, assert, input, select) {
    select.val(unexpected);
    select.trigger('change');

    actual = input.val();

    assert.notEqual(unexpected, actual, "The pair did not cascade on select event to an invalid value \"" + unexpected + "\".");
};

///#source 1 1 /Tests/dom/checkable.js
///<reference path="/Scripts/jquery-1.9.1.js" />
///<reference path="/Scripts/mixerp/mixerp-core.js" />
QUnit.test("checkable.js -> toogleSelection", function (assert) {
    var input = $('<input type="checkbox" checked="checked" />').hide();
    $('body').append(input);

    toogleSelection(input);

    if (input.not(":checked")) {
        assert.ok(true, "Input was unchecked.");
    } else {
        assert.ok(false, "Input was not unchecked.");
    };

    toogleSelection(input);//Check
    toogleSelection(input);//Uncheck
    toogleSelection(input);//Check

    if (input.is(":checked")) {
        assert.ok(true, "Input was checked.");
    } else {
        assert.ok(false, "Input was not checked.");
    };

    toogleSelection(input);//Uncheck
    toogleSelection(input);//Check
    toogleSelection(input);//Uncheck
    toogleSelection(input);//Check
    toogleSelection(input);//Uncheck

    if (input.not(":checked")) {
        assert.ok(true, "Input was unchecked again.");
    } else {
        assert.ok(false, "Input was not unchecked again.");
    };

    toogleSelection(input);//Check
    toogleSelection(input);//Uncheck
    toogleSelection(input);//Check
    toogleSelection(input);//Uncheck
    toogleSelection(input);//Check

    if (input.not(":checked")) {
        assert.ok(true, "Input was checked again.");
    } else {
        assert.ok(false, "Input was not checked again.");
    };

    input.remove();
});
///#source 1 1 /Tests/dom/events.js
///<reference path="/Scripts/jquery-1.9.1.js" />
///<reference path="/Scripts/mixerp/mixerp-core.js" />
QUnit.test("event.js -> triggerClick", function (assert) {
    var button = $("<input type='button' id='TestButton' />").hide();
    $('body').append(button);

    var actual = false;

    button.click(function () {
        actual = true;
    });

    triggerClick('TestButton');

    assert.ok(true === actual, "Successfully triggered the event 'triggerClick'.");
    button.remove();
});


QUnit.test("event.js -> triggerChange", function (assert) {
    var select = $("<select id='TestSelect' />").hide();
    $('body').append(select);

    var actual = false;

    select.change(function () {
        actual = true;
    });

    triggerChange('TestSelect');

    assert.ok(true === actual, "Successfully triggered the event 'triggerChange'.");
    select.remove();
});
///#source 1 1 /Tests/dom/visibility.js
///<reference path="/Scripts/jquery-1.9.1.js" />
///<reference path="/Scripts/mixerp/mixerp-core.js" />
QUnit.test("visibility.js -> triggerClick", function (assert) {
    var el = $("<div style='display:none;'></div>");
    $('body').append(el);

    setVisible(el, true, 0);

    var actual = el.is(":visible");

    assert.equal(actual, true, "The element was unhidden.");

    setVisible(el, false, 0);
    actual = el.is(":visible");

    assert.equal(actual, false, "The element was hidden.");

    setVisible(el, false, 0);

    actual = el.is(":visible");

    assert.equal(actual, false, "The element is still hidden.");

    setVisible(el, true, 0);
    actual = el.is(":visible");

    assert.equal(actual, true, "The element was unhidden again.");
});
