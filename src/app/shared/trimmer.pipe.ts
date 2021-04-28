import { Pipe, PipeTransform } from '@angular/core';

@Pipe(
  { name: 'trim' }
)
export class TrimmerPipe implements PipeTransform {
  transform(str: string, strLength: number = 250) {
    const withoutHtml = str.replace(/(<([^>]+)>)/gi, '');

    if (str.length >= strLength) {
      return `${withoutHtml.slice(0, strLength)}...`;
    }

    return withoutHtml;
  }
}
