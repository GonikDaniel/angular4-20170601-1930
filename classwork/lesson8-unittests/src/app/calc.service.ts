export class CalcService {

  sum(a: number, b: number): number {
    return a + b;
  }

  sumAsync(a: number, b: number): Promise<number> {
    return new Promise( resolve => {
      setTimeout(() => {
        resolve(a + b);
      }, 3000);
    });
  }
}


/*
@Injectable
@Component
@Directive
@Pipe
*/
