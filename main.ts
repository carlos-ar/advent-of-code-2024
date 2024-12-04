
// read a list numbers with two columns
export async function readNumbersFromFile(filePath: string): Promise<{ firstNumbers: number[]; secondNumbers: number[] }> {
  const firstNumbers: number[] = [];
  const secondNumbers: number[] = [];
  const fileContent = await Deno.readTextFile(filePath);
  const lines = fileContent.split("\n");
  
  for (const line of lines) {
    if (line.trim()) {
      const [first, second] = line.split("   ").map(Number);
      firstNumbers.push(first);
      secondNumbers.push(second);
    }
  }

  return { firstNumbers, secondNumbers };
}

export function part1(array): number{
  const sortFirst = array.firstNumbers.sort((a,b) => a - b)
  const sortSecond = array.secondNumbers.sort((a,b) => a - b)
  const diff = sortFirst.map((value, index) => Math.abs(value - sortSecond[index]))
  const sumDiff = diff.reduce((sum, current) => sum+current, 0)
  // now sort the files
  // console.log(array);
  // console.log(sortFirst)
  // console.log(sortSecond)
  // console.log(diff)
  // console.log(sumDiff)
  return sumDiff
}

export function part2(array): number{
  // create dict? map? for each unique value and its number of times
  const uniqueValues: { [key: string]: number } = {};

  for (const element of array.secondNumbers) {
    const key = String(element); 
    uniqueValues[key] = (uniqueValues[key] || 0) + 1;
  }

  // console.log(uniqueValues)
  var simScore = 0

  for (const element of array.firstNumbers) {
    // console.log(uniqueValues[String(element)])
    if (String(element) in uniqueValues){
      simScore += element*uniqueValues[String(element)]  
    } else {
      simScore += element*0
    }
    
  }
  return simScore
}

export async function day01(): Promise<number>{
  // get numbers from file
  // const path = './day01/example_part1.txt'
  const path = './day01/file.txt'
  const filedata = await readNumbersFromFile(path);

  // const result = part1(filedata)
  const result = part2(filedata)
  


  return result;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const result = await day01()
  console.log(result)
}
