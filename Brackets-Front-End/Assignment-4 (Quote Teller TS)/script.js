var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var createElement = function (name, id) {
    var newElement = document.createElement(name);
    newElement.setAttribute("id", id);
    return newElement;
};
var quote = document.getElementById("quote") || createElement("p", "quote");
var author = document.getElementById("author") || createElement("p", "author");
var body = document.getElementsByTagName("body")[0];
var fonts = ['Acme', 'BebasNeue', 'Caveat', 'Cookie', 'DancingScript', 'GreatVibes', 'IndieFlower', 'IslandMoments', 'Kalam', 'Lato', 'Lobster', 'Orbitron', 'Pacifico', 'Righteous', 'RubikBubbles', 'Sacramento', 'Satisfy', 'SpecialElite', 'SquarePeg', 'Updock', 'Whisper'];
var categories = ['amazing', 'art', 'attitude', 'beauty', 'best', 'change', 'courage', 'death', 'dreams', 'education', 'experience', 'failure', 'family', 'famous', 'forgiveness', 'friendship', 'future', 'good', 'great', 'happiness', 'health', 'hope', 'imagination', 'inspirational', 'learning', 'life', 'love', 'mom', 'money', 'morning', 'success'];
var getQuotation = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response, quo, randIndex, font, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
                        }
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                quo = _a.sent();
                console.log(quo);
                if (quo[0].quote.length < 150)
                    quote.innerHTML = quo[0].quote;
                else {
                    quote.innerHTML = quo[0].quote;
                    quote.style.fontSize = "30px";
                }
                author.innerHTML = "\"".concat(quo[0].author, "\"");
                randIndex = Math.floor(Math.random() * fonts.length);
                font = new FontFace(fonts[randIndex], "url(./fonts/" + fonts[randIndex] + ".ttf)");
                document.fonts.add(font);
                font.load().then(function (data) {
                    quote.style.fontFamily = data.family;
                })["catch"](function (err) {
                    console.log(err);
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getBackground = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response, reader_1, _a, _b, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url, {
                        headers: {
                            'Accept': 'image/jpg',
                            'X-Api-Key': 'Vs+S8C7kMegBlpN0hx+JtQ==iGgOnhyDXswshqZe'
                        }
                    })];
            case 1:
                response = _c.sent();
                reader_1 = new FileReader();
                _b = (_a = reader_1).readAsDataURL;
                return [4 /*yield*/, response.blob()];
            case 2:
                _b.apply(_a, [_c.sent()]);
                reader_1.onload = function () {
                    body.style.backgroundImage = "url(" + reader_1.result + ")";
                };
                return [3 /*break*/, 4];
            case 3:
                err_2 = _c.sent();
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var generateNext = function () {
    var catIndex = Math.floor(Math.random() * categories.length);
    var quoteUrl = "https://api.api-ninjas.com/v1/quotes?category=".concat(categories[catIndex]);
    var imgUrl = "https://api.api-ninjas.com/v1/randomimage?category=nature&width=1280&height=720";
    try {
        getQuotation(quoteUrl);
        getBackground(imgUrl);
    }
    catch (err) {
        alert("Error with the API Call");
    }
};
generateNext();
