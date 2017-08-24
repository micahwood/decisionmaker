export default class OptionList {
    options = [];

    addOption(option) {
        this.options = this.options.concat(option);
    }
}