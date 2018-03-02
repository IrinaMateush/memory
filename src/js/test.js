"use strict"

describe("matchChecker", function() {

    it("пусть 1 - карты равны, 0 - разные. Ходы: 0", function() {
    assert.equal(matchChecker('QA', 'QC', 0, 0, 9), 0);
    })
    it("Ходы: 1", function() {
        assert.equal(matchChecker('QA', 'QA', 0, 1, 8), 336);
    });

    it("Ходы: 1, 1", function() {
        assert.equal(matchChecker('QA', 'QA', 336, 2, 7), 630);
    });

    it("Ходы: 1, 0", function() {
        assert.equal(matchChecker('QA', 'QC', 336, 1, 8), 294);
    });

    it("5 побед подряд и два поражения (вычитание верное)", function() {
        assert.equal(matchChecker('QA', 'QС', 1260, 5, 4), 1050);
    });

    it("Все ходы выйгрышные (сложение верное)", function() {
        assert.equal(matchChecker('QA', 'QA', 1512, 9, 0), 1512);
    });

    });