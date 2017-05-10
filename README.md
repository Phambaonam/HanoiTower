## Bài toán Dùng D3js để biểu diễn các bước chạy của thuật toán tháp Hà Nội (HaNoi Tower)
### Cách giải bài toán:
* Đặt tên các cọc là A, B, C (ở đây: A = Cọc Nguồn, B = Cọc Trung Gian, C = Cọc Đích).
* Gọi n là tổng số đĩa.
* đánh số đĩa từ 1 (nhỏ nhất, trên cùng) đến n (lớn nhất, dưới cùng).
#####  Để chuyển n đĩa từ cọc A sang cọc C thì cần:
1. chuyển n-1 đĩa từ A sang B. Chỉ còn lại đĩa n trên cọc A.
2. chuyển đĩa n từ A sang C.
3. chuyển n-1 đĩa từ B sang C cho chúng nằm trên đĩa n

#### Dùng thuật đệ quy để giải quyết bài toán này, tiến hành bước 1 và 3, áp dụng lại thuật giải cho n-1.
### Ví dụ cho 3 đĩa, các bước tiến hành:
1. chuyển đĩa 1 sang cọc C.
2. chuyển đĩa 2 sang cọc B.
3. chuyển đĩa 1 từ C sang B sao cho nó nằm lên 2.
##### Vậy ta hiện có 2 đĩa đã nằm trên cọc B, cọc C hiện thời trống
4. chuyển đĩa 3 sang cọc C
5. lặp lại 3 bước trên để chuyển 1 & 2 cho nằm lên 3.

![Image of Ha Noi Tower](Tower_of_Hanoi.gif)
