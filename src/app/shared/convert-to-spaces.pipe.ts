import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'convertToSpaces'
})
export class ConvertToSpacesPipe implements PipeTransform {
    transform(value: string, character: string): string {
        const regex: RegExp = new RegExp(character, 'g');
        return value.replace(regex, ' ');
    }
}
