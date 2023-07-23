import { useSelector } from "react-redux";

export default function GetRandomNumberNotInList(pokeData) {
    let min = 1
    let max = 530;

    let exclusionList = pokeData.map(x => x.id)
    const allNumbers = Array.from({ length: max - min + 1 }, (_, index) => min + index);
    const availableNumbers = allNumbers.filter(number => !exclusionList.includes(number));

    if (availableNumbers.length === 0) {
        throw new Error('No available numbers. All numbers are in the exclusion list.');
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
}