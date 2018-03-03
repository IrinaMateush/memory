    describe("test replaceScore", function() {
        it("первый ход - промах", function() {
            assert.equal(replaceScore(0, 0), 0, 'ошибка в вычитании: очки не равны 0 после первого промаха');
        });

        it("промах, после одного угаданного совпадения", function() {
            assert.equal(replaceScore(336, 1), 294, 'ошибка в вычитании очков');
        });

        it("очередной промах после 5 побед и нескольких промахов (очки = 0)", function() {
            assert.equal(replaceScore(0, 5), 0, 'ошибка в вычитании очков');
        });

    });

    describe("test  addScore", function() {

            it("Было одно совпадение", function() {
                assert.equal(addScore(0, 8), 336, 'ошибка при подсчете выйгрышных очков');
            });
        
            it("Было четыре совпадения", function() {
                assert.equal(addScore(336, 5), 546, 'ошибка при подсчете выйгрышных очков');
            });
        
            it("Найдены все пары", function() {
                assert.equal(addScore(1512, 0), 1512, 'ошибка при подсчете выйгрышных очков');
            });
    });


    describe("test сreateNewDeck", function() {
        it("сreateNewDeck создает колоду из 18 карт", function() {
            assert.equal((сreateNewDeck(cardsDeck).length), 18, 'ошибка: в колоде должно быть 18 карт');
        });
});


describe("test shuffle", function() {
    it("shuffle перемешивает колоду", function() {
        assert.deepEqual(shuffle(cardsDeck), cardsDeck, 'как-то криво карты перемешались :(');
    });
});