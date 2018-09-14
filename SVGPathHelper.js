var SVGPathHelper = function() {
    this.commands = [];

    this.splitSvgPath = function(path) {
        res = "";
        for (var i = 0; i < path.length; i++) {
            var c = path.charCodeAt(i);
            if (c < "A".charCodeAt(0)) {
                res += path[i];
            } else {
                res += "\n" + path[i];
            }
        }
        res = res.trim();
        res = res.split("\n");
        res = res.map(
            x => x.trim()
            .replace("M", "M ")
            .replace(",", " ")
            .replace(",", " ")
            .split(" ")
            .reduce((acc, item) => {
                if (item != "") {
                    acc.push(item);
                }
                return acc;
            }, [])
            .map((item, index) => (index == 0 ? item : parseFloat(item.trim())))
        );
        return res;
    }

    this.withPath = function(path) {
        this.commands = this.splitSvgPath(path);
        return this;
    }

    this.toString = function() {
        return this.commands.map(command => {
            return command.map((item, index) => {
                if (index == 0) return item;
                return item.toFixed(3)
            }).join(" ")
        }).join(" ");
    }

    this.scale = function(scaleX, scaleY) {
        this.commands = this.commands.map(command => {
            return command.map((item, index) => {
                if (index == 0) return item;
                if (index % 2 == 0) {
                    // y command
                    return item * scaleY;
                } else {
                    // x command
                    return item * scaleX;
                }
            });
        });
        return this;
    }

    this.scaleTo = function(width, height) {
        var pathSize = this.size();
        return this.scale(width / pathSize.x, height / pathSize.y);
    }

    this.translate = function(deltaX, deltaY) {
        this.commands = this.commands.map(command => {
            return command.map((item, index) => {
                if (index == 0) return item;
                if (index % 2 == 0) {
                    // y command
                    return item + deltaY;
                } else {
                    // x command
                    return item + deltaX;
                }
            });
        });
        return this;
    }

    this.rotate = function(angle, centerX, centerY) {
        centerX = centerX | 0;
        centerY = centerY | 0;
        var cosAngle = Math.cos(angle);
        var sinAngle = Math.sin(angle);
        this.commands = this.commands.map(command => {
            for (var i = 1; i < command.length; i = i + 2) {
                var x = command[i] - centerX;
                var y = command[i + 1] - centerY;

                command[i] = (x * cosAngle) + (y * sinAngle) + centerX;
                command[i + 1] = (-x * sinAngle) + (y * cosAngle) + centerY;
            }
            return command;
        });
        return this;
    }

    this.min = function() {
        return this.commands.reduce((acc, command) => {
            return command.reduce((localAcc, item, index) => {
                if (index != 0) {
                    if (index % 2 == 0) {
                        // y command
                        localAcc.y = Math.min(localAcc.y, item);
                    } else {
                        // x command
                        localAcc.x = Math.min(localAcc.x, item);
                    }
                }
                return localAcc;
            }, acc)
        }, {x: Infinity, y: Infinity})
    }

    this.max = function() {
        return this.commands.reduce((acc, command) => {
            return command.reduce((localAcc, item, index) => {
                if (index != 0) {
                    if (index % 2 == 0) {
                        // y command
                        localAcc.y = Math.max(localAcc.y, item);
                    } else {
                        // x command
                        localAcc.x = Math.max(localAcc.x, item);
                    }
                }
                return localAcc;
            }, acc)
        }, {x: -Infinity, y: -Infinity})
    }

    this.minimize = function() {
        var minPoint = this.min();
        return this.translate(-minPoint.x, -minPoint.y);
    }

    this.size = function() {
        var minPoint = this.min();
        var maxPoint = this.max();
        return {
            x: maxPoint.x - minPoint.x, 
            y: maxPoint.y - minPoint.y
        };
    }

    this.centerOnCanvas = function(width, height) {
        var minPoint = this.min();
        var maxPoint = this.max();
        var pathSize = {
            x: maxPoint.x - minPoint.x, 
            y: maxPoint.y - minPoint.y
        };

        var centerPos = {
            x: (width - pathSize.x) / 2,
            y: (height - pathSize.y) / 2
        };

        centerPos.x -= minPoint.x;
        centerPos.y -= minPoint.y;
        return this.translate(centerPos.x, centerPos.y);
    }

    this.listAllCommands = function() {
        return this.commands.reduce((acc, cmd) => {
            if (acc.indexOf(cmd[0]) == -1) acc.push(cmd[0])
            return acc;
        }, [])
    }

    this.interpolateCurve = function(commandIndex, t) {
        // source for this calculation: https://www.desmos.com/calculator/cahqdxeshd
        var prevCommand = this.commands[commandIndex - 1];
        var thisCommand = this.commands[commandIndex];
        var x_0 = prevCommand[prevCommand.length - 2];
        var y_0 = prevCommand[prevCommand.length - 1];
        var x_1 = thisCommand[1];
        var y_1 = thisCommand[2];
        var x_2 = thisCommand[3];
        var y_2 = thisCommand[4];
        var x_3 = thisCommand[5];
        var y_3 = thisCommand[6];
        // this is a simplified version of the eq shown in source
        return {
            x: t*(t*(t*(-x_0+3*x_1-3*x_2+x_3)+3*x_0-6*x_1+3*x_2)-3*x_0+3*x_1)+x_0,
            y: t*(t*(t*(-y_0+3*y_1-3*y_2+y_3)+3*y_0-6*y_1+3*y_2)-3*y_0+3*y_1)+y_0,
        }
    }
}
