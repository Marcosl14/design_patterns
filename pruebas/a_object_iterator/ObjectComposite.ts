/**
 * @description clase ObjectComposite
 */
export default class ObjectComposite {
  private mappedObject: any;
  private compareInnerArrayValues: boolean;

  constructor(obj1: any, obj2: any, compareInnerArrayValues: boolean) {
    this.compareInnerArrayValues = compareInnerArrayValues;

    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      throw new Error('Invalid argument. Function given.');
    }

    if (this.isValue(obj1) && this.isValue(obj2)) {
      const data: MappedObjectInterface = {
        type: this.compareValues(obj1, obj2),
        was: obj1,
        data: obj2,
      };

      this.mappedObject = data;

      return;
    }

    if ((this.isArray(obj1) || !obj1) && (this.isArray(obj2) || !obj2)) {
      if (this.compareInnerArrayValues) {
        this.mappedObject = [];

        const obj1Values = this.convertValuesToCompareArrays(obj1);
        const obj2Values = this.convertValuesToCompareArrays(obj2);

        this.compareArrayValues(obj1Values, obj2Values);
      } else {
        const data: MappedObjectInterface = {
          type: this.compareValues(JSON.stringify(obj1), JSON.stringify(obj2)),
          was: obj1,
          data: obj2,
        };

        this.mappedObject = data;
      }
      return;
    }

    if ((this.isObject(obj1) || !obj1) && (this.isObject(obj2) || !obj2)) {
      this.mappedObject = {};

      const objectKeys = [
        ...new Set([
          ...(obj1 ? Object.keys(obj1) : []),
          ...(obj2 ? Object.keys(obj2) : []),
        ]),
      ];

      objectKeys.forEach((key) => {
        this.mappedObject[key] = new ObjectComposite(
          obj1 ? obj1[key] : undefined,
          obj2 ? obj2[key] : undefined,
          this.compareInnerArrayValues
        ).mappedObject;
      });

      return;
    }

    console.log(obj1, obj2);
    throw new Error('Incopatible Attributes');
  }

  public getDiffObject(): any {
    if (this.isArray(this.mappedObject)) {
      return [...this.mappedObject];
    }

    if (this.isObject(this.mappedObject)) {
      return { ...this.mappedObject };
    }
  }

  private convertValuesToCompareArrays(arr: any[]): any[] {
    const arrValues: any[] = [];

    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (this.isValue(arr[i])) {
          arrValues.push(arr[i]);
        }

        if (this.isObject(arr[i]) || this.isArray(arr[i])) {
          arrValues.push(JSON.stringify(arr[i]));
        }

        if (this.isFunction(arr[i])) {
          throw new Error('Invalid argument. Function given.');
        }
      }
    }

    return arrValues;
  }

  private compareArrayValues(obj1Values: any[], obj2Values: any[]): void {
    const allArrayValues = [...new Set([...obj1Values, ...obj2Values])];

    allArrayValues.forEach((value: any) => {
      const foundValue1 = obj1Values.find((val: any) => val === value);
      const foundValue2 = obj2Values.find((val: any) => val === value);

      const data: MappedObjectInterface = {
        type: this.compareValues(foundValue1, foundValue2),
        was: this.parseJson(foundValue1),
        data: this.parseJson(foundValue2),
      };

      this.mappedObject.push(data);
    });
  }

  private parseJson(text: string): any {
    let value: any;

    try {
      value = JSON.parse(text);
    } catch (err) {
      value = text;
    }

    return value;
  }

  private compareValues(value1: any, value2: any) {
    if (value1 === value2) {
      return AttibuteStatusEnum.VALUE_UNCHANGED;
    }

    if (value1 === undefined) {
      return AttibuteStatusEnum.VALUE_CREATED;
    }

    if (value2 === undefined) {
      return AttibuteStatusEnum.VALUE_DELETED;
    }

    return AttibuteStatusEnum.VALUE_UPDATED;
  }

  private isArray(x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Array]';
  }

  private isObject(x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Object]';
  }

  private isValue(x: any): boolean {
    return !this.isObject(x) && !this.isArray(x);
  }

  private isFunction(x: any): boolean {
    return Object.prototype.toString.call(x) === '[object Function]';
  }
}

enum AttibuteStatusEnum {
  VALUE_CREATED = 'created',
  VALUE_UPDATED = 'updated',
  VALUE_DELETED = 'deleted',
  VALUE_UNCHANGED = 'unchanged',
}

interface MappedObjectInterface {
  type: AttibuteStatusEnum;
  was: any;
  data: any;
}

const pepe = {
  pepe: 'pepe',
  lala: [
    1,
    2,
    {
      pepe: 'pepe',
      lala: [1, 2, [1, 2, 3]],
      tete: 'lala',
    },
  ],
  tete: 'tete',
};

const pepe2 = {
  pepe: 'pepe',
  lala: [
    1,
    2,
    {
      pepe: 'pepe',
      lala: [1, 2, [1, 2, 3]],
      tete: 'tete',
    },
    ['pepe'],
  ],
  tete: 'tete',
};

// @ts-ignore
import oldImmage from './input/old_immage.json';
// @ts-ignore
import newImmage from './input/new_immage.json';

import FileHelpers from './helpers/File';

const output = new ObjectComposite(oldImmage, newImmage, false);

FileHelpers.saveFile({ dirname: 'output', fileName: 'diffObject', extention: 'json', data: JSON.stringify(output.getDiffObject()) })

// TODO: estaria bueno tener un summary. Que datos cambiaron...
