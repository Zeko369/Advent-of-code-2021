// Stupid exponential solution
// that takes up 64gb when it reaches 215 day and takes a lot of fucking time

#include <vector>
#include <string>
#include <sstream>
#include <iostream>

std::vector <char> v;

int main() {
  std::string in;
  std::cin >> in;

  std::stringstream ss(in);

  for(int i; ss >> i;) {
    v.push_back(i);
    if (ss.peek() == ',')
      ss.ignore();
  }

  for(int i = 0; i < 256; i++) {
    long currSize = v.size();
    #pragma omp parallel for
    for(long j = 0; j < currSize; j++) {
      if (v[j] == 0) {
        v[j] = 6;
        v.push_back(8);
      } else {
        v[j]--;
      }
    }

    std::cout << i << " " << v.size() << std::endl;
  }

  std::cout << v.size() << std::endl;
  return 0;
}
