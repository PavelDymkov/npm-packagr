import { Command } from "commander";
import { createInterface } from "readline";
import { exec } from "shelljs";

const program = new Command();

program
    .option("--account <value>")
    .option("--email <value>")
    .parse(process.argv);

const { account, email } = program.opts() as { account: string; email: string };

async function login(account: string, email: string): Promise<boolean> {
    console.log(`login to ${account}<${email}>`);

    const process = exec("npm login", {
        async: true,
        silent: true,
    });

    const { stdin, stdout } = process;

    return new Promise<boolean>((resolve) => {
        let step = 1;

        stdout?.on("data", () => {
            if (step === 1) {
                stdin?.write(account + "\n");
            }
            if (step === 2) {
                console.log("password:");

                getPassword().then((password) => {
                    console.log("pending...");
                    stdin?.write(password + "\n");
                });
            }
            if (step === 3) {
                stdin?.end(email + "\n");
            }

            step += 1;
        });

        process.on("close", (code) => resolve(code === 0));
        process.on("error", () => resolve(false));
    });
}

async function getPassword(): Promise<string> {
    return new Promise((resolve) => {
        createInterface({
            terminal: true,
            input: process.stdin,
        }).question("", (password) => resolve(password));
    });
}

login(account, email).then((ok) => {
    if (ok) console.log("logged in");
    else console.log("login failed");

    process.exit(ok ? 0 : 1);
});
