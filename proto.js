/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */

function Vessel(name, position, capacity) {
    this.name = name;
    this.position = position;
    this.capacity = capacity;
    this.cargo = 0;
}
Vessel.prototype.report = function () {
    /**
     * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
     * @example
     * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
     * @example
     * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
     * @name Vessel.report
     */
    return 'Корабль "' + this.name + '". Местоположение: '
        + this.position.toString() + '. Занято: '
        + this.cargo + ' из ' + this.capacity
        + 'т.';
};

Vessel.prototype.getFreeSpace = function () {
    /**
     * Выводит количество свободного места на корабле.
     * @name Vessel.getFreeSpace
     */
    return this.capacity - this.cargo;
};

Vessel.prototype.getOccupiedSpace = function () {
    /**
     * Выводит количество занятого места на корабле.
     * @name Vessel.getOccupiedSpace
     */
     
    return this.cargo;
};

Vessel.prototype.loadCargo = function (cargoWeight) {
    /**
     * Возращаем успешность операции.
     * @param {Number}|cargoWeight Количество груза.
     * @example
     * vessel.loadCargo(100);
     * @name Vessel.loadCargo
     */
    if (this.getFreeSpace() < cargoWeight) {
        return false;
    }
    this.cargo += cargoWeight;
    return true;
};
Vessel.prototype.unloadCargo = function (cargoWeight) {
    /**
     * Возращаем успешность операции.
     * @param {Number}|cargoWeight Количество груза.
     * @example
     * vessel.unloadCargo(100);
     * @name Vessel.unloadCargo
     */
    if (this.cargo < cargoWeight) {
        return false;
    }
    this.cargo -= cargoWeight;
    return true;
};
Vessel.prototype.flyTo = function (newPosition) {
    /**
     * Переносит корабль в указанную точку.
     * @param {Number}[]|Planet newPosition Новое местоположение корабля.
     * @example
     * vessel.flyTo([1,1]);
     * @example
     * var earth = new Planet('Земля', [1,1]);
     * vessel.flyTo(earth);
     * @name Vessel.report
     */
    if (newPosition instanceof Planet) {
        this.position = newPosition.position;
    } else {
        this.position = newPosition;
    }
    return true;
};
/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.name = name;
    this.position = position;
    this.availableAmountOfCargo = availableAmountOfCargo;
};
        
Planet.prototype.report = function () {
    /**
     * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
     * @name Planet.report
     */
    return 'Планета "' + this.name + '". Местоположение: '
        + this.position.toString() + '. '
        + (
            this.availableAmountOfCargo === 0 ? 
            'Грузов нет' : ('Доступно груза ' + this.availableAmountOfCargo + 'т')
        )
        + '.';
};
Planet.prototype.getAvailableAmountOfCargo = function () {
    /**
     * Возвращает доступное количество груза планеты.
     * @name Vessel.getAvailableAmountOfCargo
     */
    return this.availableAmountOfCargo;
};
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
    /**
     * Загружает на корабль заданное количество груза.
     * 
     * Перед загрузкой корабль должен приземлиться на планету.
     * @param {Vessel} vessel Загружаемый корабль.
     * @param {Number} cargoWeight Вес загружаемого груза.
     * @name Vessel.loadCargoTo
     */
    if (vessel.loadCargo(cargoWeight)) {
        this.availableAmountOfCargo - cargoWeight;
        return 'Груз отгружен c планеты "' + this.name
            + '" на корабль "' + vessel.name + '" (' + cargoWeight + 'т).';
    } else {
        return 'На корабле "' + vessel.name + '" нехватает места для '
            + (cargoWeight - vessel.getFreeSpace()) + 'т.';
    }
};
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
    /**
     * Выгружает с корабля заданное количество груза.
     * 
     * Перед выгрузкой корабль должен приземлиться на планету.
     * @param {Vessel} vessel Разгружаемый корабль.
     * @param {Number} cargoWeight Вес выгружаемого груза.
     * @name Vessel.unloadCargoFrom
     */
    if (vessel.unloadCargo(cargoWeight)) {
        this.availableAmountOfCargo - cargoWeight;
        return 'Груз отгружен c корабля "' + vessel.name + '" на планету "' + this.name
            + '" (' + cargoWeight + 'т).';
    } else {
        return 'На корабле "' + vessel.name + '" нет столько груза (недостача '
            + (cargoWeight - vessel.cargo) + 'т).';
    }
}
