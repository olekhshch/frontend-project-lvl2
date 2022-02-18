import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const data1 = JSON.parse(readFileSync(filepath1));
    const data2 = JSON.parse(readFileSync(filepath2));

    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);

    const keys = _.uniq(keys1.concat(keys2)).sort();

    const obj = keys.flatMap((key) => {
        if (data1[key] && data2[key]) {
            if (data1[key] === data2[key]) {
                return `  ${key}: ${data1[key]}`;
            }
            return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
        }
        if (!data2[key]) {
            return `- ${key}: ${data1[key]}`;
        }
        return `+ ${key}: ${data2[key]}`;
    });

    return `{\n  ${obj.join(`\n  `)}\n}`;
};

export default genDiff;