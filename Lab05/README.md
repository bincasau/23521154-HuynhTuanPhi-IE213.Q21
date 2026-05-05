# Lab05 - Xây Dựng Frontend Với ReactJS

## 1. Mục tiêu bài thực hành

- Kết nối frontend với backend bằng `axios`.
- Xây dựng danh sách phim có tìm kiếm theo `title` và `rating`.
- Hiển thị chi tiết phim, danh sách review và chức năng thêm/sửa/xóa review.
- Thiết lập định tuyến bằng `react-router-dom`.

---

## 2. Nội dung bài làm

### 2.1. Cài đặt `axios`

![Thao tác câu 1.1](images/cau1.1.png)

---

### 2.2. Tạo service `MovieDataService`

![Thao tác câu 1.2](images/cau1.3.png)

---

### 2.3. Xây dựng `MoviesList` component

#### 2.3.1. Tạo các biến trạng thái

![Thao tác câu 2.1.1](images/cau2.1.1.png)

#### 2.3.2. Tạo `retrieveMovies()` và `retrieveRatings()`

![Thao tác câu 2.1.2](images/cau2.1.2.png)

#### 2.3.3. Tạo form tìm kiếm theo `title` và `rating`

![Thao tác câu 2.3.1](images/cau2.3.1.png)

#### 2.3.4. Hiển thị movie bằng `Card`

![Thao tác câu 2.4](images/cau2.4.png)

#### 2.3.5. Giao diện `MoviesList` hoàn chỉnh

![Thao tác câu 2.5](images/cau2.5.png)

---

### 2.4. Xây dựng component `Movie`

#### 2.4.1. Thiết lập component `Movie`

![Thao tác câu 3.1](images/cau3.1.png)

#### 2.4.2. Tạo phương thức `getMovie()`

![Thao tác câu 3.2](images/cau3.2.png)

#### 2.4.3. Hiển thị trang chi tiết movie

![Thao tác câu 3.3.1](images/cau3.3.1.png)  
![Thao tác câu 3.3.2](images/cau3.3.2.png)

#### 2.4.4. Hiển thị danh sách review

![Thao tác câu 3.3.3](images/cau3.3.3.png)  
![Thao tác câu 3.3.4](images/cau3.3.4.png)

---

### 2.5. Hiển thị review và thao tác thêm/sửa/xóa

#### 2.5.1. Hiển thị danh sách review

![Thao tác câu 4.1](images/cau4.1.png)

#### 2.5.2. Điều chỉnh hiển thị thời gian bằng `momentjs`

![Thao tác câu 4.2.1](images/cau4.2.1.png)  
![Thao tác câu 4.2.2](images/cau4.2.2.png)
