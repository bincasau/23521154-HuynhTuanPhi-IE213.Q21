# Lab03 - Hoàn thiện backend cho ứng dụng minh họa

## 1. Mục tiêu bài thực hành

- Viết các api cho review
- Bổ sung 2 api lấy rating và thông tin có liên quan movie

---

## 2. Nội dung bài làm

### 2.1. Thiết lập định tuyến cho các thao tác với review

![Thao tác câu 1](images/cau1.png)

### 2.2. Tạo file reviews.controller.js

![Thao tác câu 2.1](images/cau2.1.png)

### 2.3. import nội dung từ reviewDao.js

![Thao tác câu 2,2](images/cau2.2.png)

### 2.4. Tạo phương thức apiPostReview()

![Thao tác câu 2.3](images/cau2.3.png)

### 2.5. Tạo phương thức apiUpdateReview()

![Thao tác câu 2.4](images/cau2.4.png)

### 2.6. Tạo phương thức apiDeleteReview()

![Thao tác câu 2.5](images/cau2.5.png)

### 2.7. Tạo tệp tin reviewDao.js

![Thao tác câu 3.1](images/cau3.1.png)

### 2.8. Tạo phương thức injectDB() và gọi trong tệp tin index.js

![Thao tác câu 3.2.1](images/cau3.2.1.png)
![Thao tác câu 3.2.2](images/cau3.2.2.png)

### 2.9. Tạo phương thức addReview()

![Thao tác câu 3.3](images/cau3.3.png)

### 2.10. Tạo phương thức updateReview()

![Thao tác câu 3.4](images/cau3.4.png)

### 2.11. Tạo phương thức deleteReview()

![Thao tác câu 3.5](images/cau3.5.png)

### 2.12. Test các API thêm/sửa/xóa review

![Thao tác câu 3.6.1](images/cau3.6.1.png)
![Thao tác câu 3.6.2](images/cau3.6.2.png)
![Thao tác câu 3.6.3](images/cau3.6.3.png)

### 2.13. Thêm 2 định tuyến cho movie

![Thao tác câu 4.1](images/cau4.1.png)

### 2.14. Thêm 2 phương thức apiGetMovieByID() và apiGetRatings() trong MovieController

![Thao tác câu 4.2](images/cau4.2.png)

### 2.15. Thêm 2 phương thức getRatings() và getMovieById() trong MovieDao

![Thao tác câu 4.3](images/cau4.3.png)

### 2.16. Thử nghiệm 2 api vừa viết cho movie

![Thao tác câu 4.4.1](images/cau4.4.1.png)
![Thao tác câu 4.4.2](images/cau4.4.2.png)
