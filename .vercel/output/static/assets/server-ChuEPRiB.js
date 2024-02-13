let t;async function e(){return(await t.ssrLoadModule("./src/server.ts")).default}async function s(){console.log("test"),new(await e())(t)}s();
