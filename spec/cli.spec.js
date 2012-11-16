var shell = require('shelljs'),
    path = require('path'),
    bin = 'node ' + path.resolve(path.join(__dirname, '..', 'bin', 'phonegap-build.js')),
    CLI = require('../lib/cli'),
    cli;

describe('$', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
    });

    describe('shell delegation', function() {
        it('should support no arguments', function() {
            var process = shell.exec(bin + '', { silent: true });
            expect(process.output).toMatch('Usage:');
        });

        it('should support commands', function() {
            var process = shell.exec(bin + ' version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });

        it('should support options', function() {
            var process = shell.exec(bin + ' --version', { silent: true });
            expect(process.output).toMatch(/^\w+\.\w+\.\w+/);
        });
    });

    describe('help', function() {
        describe('$ phonegap-build', function() {
            it('should output the usage information', function() {
                cli.argv({ _: [] });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
            });
        });

        describe('$ phonegap-build help', function() {
            it('should output the usage information', function() {
                cli.argv({ _: [ 'help' ] });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
            });
        });

        describe('$ phonegap-build --help', function() {
            it('should output the usage information', function() {
                cli.argv({ _: [], help: true });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
            });
        });

        describe('$ phonegap-build -h', function() {
            it('should output the usage information', function() {
                cli.argv({ _: [], h: true });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/usage:/i);
            });
        });
    });

    describe('version', function() {
        describe('$ phonegap-build --version', function() {
            it('should output with the format x.x.x', function() {
                cli.argv({ _: [], version: true });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/\d+\.\d+\.\d+/);
            });
        });

        describe('$ phonegap-build -v', function() {
            it('should output with the format x.x.x', function() {
                cli.argv({ _: [], v: true });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/\d+\.\d+\.\d+/);
            });
        });
    });

    describe('login', function() {
        describe('$ phonegap-build login', function() {
            it('should delegate to CLI login', function() {
                spyOn(cli, 'login');
                cli.argv({ _: ['login'] });
                expect(cli.login).toHaveBeenCalled();
            });
        });
    });

    describe('unknown', function() {
        describe('$ phonegap-build noop', function() {
            it('should output the unknown command', function() {
                cli.argv({ _: [ 'noop' ] });
                expect(process.stdout.write.mostRecentCall.args[0]).toMatch(/unknown command:/i);
            });
        });
    });
});
