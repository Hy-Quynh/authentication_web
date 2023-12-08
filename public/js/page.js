(function ($) {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
      const pattern = el.getAttribute("placeholder"),
        slots = new Set(el.dataset.slots || "_"),
        prev = ((j) =>
          Array.from(pattern, (c, i) => (slots.has(c) ? (j = i + 1) : j)))(0),
        first = [...pattern].findIndex((c) => slots.has(c)),
        accept = new RegExp(el.dataset.accept || "\\d", "g"),
        clean = (input) => {
          input = input.match(accept) || [];
          return Array.from(pattern, (c) =>
            input[0] === c || slots.has(c) ? input.shift() || c : c
          );
        },
        format = () => {
          const [i, j] = [el.selectionStart, el.selectionEnd].map((i) => {
            i = clean(el.value.slice(0, i)).findIndex((c) => slots.has(c));
            return i < 0
              ? prev[prev.length - 1]
              : back
              ? prev[i - 1] || first
              : i;
          });
          el.value = clean(el.value).join``;
          el.setSelectionRange(i, j);
          back = false;
        };
      let back = false;
      el.addEventListener("keydown", (e) => (back = e.key === "Backspace"));
      el.addEventListener("input", format);
      el.addEventListener("focus", format);
      el.addEventListener(
        "blur",
        () => el.value === pattern && (el.value = "")
      );
    }
  });

  jQuery(document).ready(function ($) {
    
    $("#signupButton").click(function () {
      $(".validSuccess.success").empty();
      $(".validSuccess").removeClass("success");
      $(".validError.error").empty();
      $(".validError").removeClass("error");

      let valid = true;
      //user_name
      const userName = $("#loginName").val();
      if (userName?.trim()?.length < 5) {
        displayValidate(
          "#validationLoginName",
          "Họ tên không được dưới 5 kí tự"
        );
        valid = false;
      } else {
        removeValidate("#validationLoginName");
      }

      //user_email
      const email = $("#loginEmail").val();
      if (
        !email
          .trim()
          .match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        displayValidate("#validationLoginEmail", "Email sai định dạng");
        valid = false;
      } else {
        removeValidate("#validationLoginEmail");
      }

      //user_phone
      const phone = $("#loginPhone").val();
      if (!phone.trim().match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
        displayValidate("#validationLoginPhone", "Số điện thoại sai định dạng");
        valid = false;
      } else {
        removeValidate("#validationLoginPhone");
      }


      //user_address
      const userAddress = $("#loginAddress").val();
      if (userAddress?.trim()?.length < 5) {
        displayValidate(
          "#validationLoginAddress",
          "Địa chỉ không được dưới 5 kí tự"
        );
        valid = false;
      } else {
        removeValidate("#validationLoginAddress");
      }

      //password
      const userPassword = $("#loginPassword").val();
      if (userPassword?.trim()?.length < 6) {
        displayValidate(
          "#validationLoginPassword",
          "Mật khẩu không được dưới 6 kí tự"
        );
        valid = false;
      } else {
        removeValidate("#validationLoginPassword");
      }

      //confirm password
      const userConfirmPassword = $("#loginConfirmPassword").val();
      if (userConfirmPassword !== userPassword) {
        displayValidate(
          "#validationLoginConfirmPassword",
          "Mật khẩu nhập lại không chính xác"
        );
        valid = false;
      } else {
        removeValidate("#validationLoginConfirmPassword");
      }


      if (valid) {
        const userData = {
          userName: userName,
          email: email,
          phone: phone,
          address: userAddress,
          password: userPassword
        }
        $.ajax({
          type: "POST",
          url: "/user/sign-up",
          data: {...userData},
          success: function (data) {
            if (data.success) {
              $(".validSuccess")
                .addClass("success")
                .append(`<i class="far fa-check-circle"></i> ${data.status}`);
              alert(
                "Bạn đã đăng kí thành công, chuyển hướng sang trang đăng nhập sau 1 giây"
              );
              setTimeout(() => {
                window.location.href = "/user/sign-in";
              }, 1000);
            }
          },
          error: function (res) {
            if (res.responseJSON.signUpError) {
              $(".validError")
                .addClass("error")
                .append(
                  `<i class="far fa-check-circle"></i> ${res.responseJSON.signUpError}`
                );
            }
          },
        });
      }
    });

    //login
    $("#signinButton").click(function () {
      $(".validSuccess.success").empty();
      $(".validSuccess").removeClass("success");
      $(".validError.error").empty();
      $(".validError").removeClass("error");
      let valid = true;

      //email
      const email = $("#loginEmail").val();
      if (!email?.trim()?.length) {
        displayValidate(
          "#validationLoginEmail",
          "Email không được bỏ trống"
        );
        valid = false;
      } else {
        removeValidate("#validationLoginEmail");
      }

      //password
      const password = $("#loginPassword").val();
      if (!password?.trim()?.length) {
        displayValidate(
          "#validationLoginPassword",
          "Mật khẩu không được bỏ trống"
        );
        valid = false;
      } else {
        removeValidate("#validationLoginPassword");
      }

      if (valid) {
        $.ajax({
          type: "POST",
          url: "/user/sign-in",
          data: {
            email: email,
            password: password,
          },
          success: function (data) {
            if (data.success) {
              if (data?.role === "user") {
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000);
              } 
            }
          },
          error: function (res) {
            if (res.responseJSON.loginError) {
              $(".validError")
                .addClass("error")
                .append(
                  `<i class="far fa-check-circle"></i> ${res.responseJSON.loginError}`
                );
            }
          },
        });
      }
    });
  });
})(jQuery);

const displayValidate = (id, message) => {
  $(id)
    .addClass("error")
    .find("span")
    .empty()
    .append(`<i class="fa fa-exclamation-circle"></i> ${message}`);
  $(this).addClass("error");
};

const removeValidate = (id) => {
  $(id).addClass("error").find("span").empty();
  $(this).removeClass("error");
};

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formatDate = dd + "/" + mm + "/" + yyyy;
  return formatDate;
};




