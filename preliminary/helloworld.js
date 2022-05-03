const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;

// Обратите внимание, что мы создали функцию-хелпер, serveStaticFile, выпол-
// няющую большой объем работы. fs.readFile — асинхронный метод для чтения
// файлов. Существует синхронная версия этой функции — fs.readFileSync , но
// чем быстрее вы начнете мыслить асинхронно, тем лучше. В функции fs.readFile
// используется шаблон под названием «обратный вызов» (callbacks). Вы предо-
// ставляете функцию обратного вызова (callback function), и после того, как работа
// выполнена, происходит вызов этой функции (так сказать, она «вызывается об-
// ратно»). В этом случае fs.readFile читает содержимое указанного файла и вы-
// полняет функцию обратного вызова по завершении чтения файла. Если файла
// не существует или были проблемы с правами доступа при чтении файла, уста-
// навливается значение переменной err и функция возвращает код состояния HTTP
// 500, указывающий на ошибку сервера. Если файл был прочитан успешно, он от-
// правляется клиенту с заданным кодом ответа и типом содержимого. Коды ответа
// подробнее рассмотрены в главе 6
// Запись __dirname будет соответствовать каталогу, в котором находится выполня-
// емый скрипт. Если ваш скрипт размещен в /home/sites/app.js, __dirname будет со-
// ответствовать /home/sites. Использовать такую удобную глобальную переменную
// везде, где возможно, — хорошая идея. Если этого не сделать, можно получить
// трудно диагностируемые ошибки при запуске приложения из другого каталога.

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("500 - Internal Error");
    }
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // url to lower case and remove / in the end of line
  const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
  switch (path) {
    case "":
      serveStaticFile(res, "/public/home.html", "text/html");
      break;
    case "/about":
      serveStaticFile(res, "/public/about.html", "text/html");
      break;
    case "/img/logo.png":
      serveStaticFile(res, "/public/img/logo.png", "image/png");
      break;
    default:
      serveStaticFile(res, "/public/404.html", "text/html");
      break;
  }
});

server.listen(port, () =>
  console.log(`server started on port ${port}; press Ctrl+C for stop...`)
);
