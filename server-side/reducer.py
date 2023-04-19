#!/usr/bin/env python3
import sys
from collections import defaultdict


def main():
    # Create a nested dictionary to store term frequencies
    term_freqs = defaultdict(lambda: defaultdict(int))

    # Read input from stdin
    for line in sys.stdin:
        # Parse file name, word, and count from the input line
        file_name, word, count = line.strip().split('\t')

        # Update term frequency
        term_freqs[file_name][word] += int(count)

    # Print term frequencies for debugging
    for file_name, word_freqs in term_freqs.items():
        for word, freq in word_freqs.items():
            print(f'{file_name}	{word}	{freq}', file=sys.stderr)

    # Create a list of tuples containing file_name, word, and freq
    freq_list = []
    for file_name, word_freqs in term_freqs.items():
        for word, freq in word_freqs.items():
            freq_list.append((file_name, word, freq))

    # Sort the list of tuples in descending order by frequency
    freq_list = sorted(freq_list, key=lambda x: x[2], reverse=True)

    # Output aggregated term frequencies
    for file_name, word_freqs in term_freqs.items():
        for word, freq in word_freqs.items():
            print(f'{file_name}	{word}	{freq}')


if __name__ == '__main__':
    main()
