import Swal from 'sweetalert2';

export default function responsedErrorHandler(err) {
  if ([400, 401, 403, 404, 409, 500].includes(err.response.status)) {
    Swal.fire({
      icon: 'error',
      title: 'พบข้อผิดพลาด !!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  return new Promise((resolve, reject) => reject(err));
}
