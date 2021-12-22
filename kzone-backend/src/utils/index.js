const moment = require("moment");
const timeToRound = 15; //minutes

const TYPE_OVERTIME_BY_DAY = 0;
const TYPE_EARLYTIME_BY_DAY = 2;
const TYPE_OVERTIME_BY_NIGHT = 1;
const TYPE_EARLYTIME_BY_NIGHT = 3;

const pointCheckinDayTime = "14:00:00";
const pointCheckoutDayTime = "12:00:00";
const pointCheckinNightTimeFrom = "21:00:00";
const pointCheckinNightTimeTo = "05:00:00";

const FORMAT = {
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm:ss",
  DATE_TIME: "YYYY-MM-DD HH:mm"
};

const getByDaily = ({
  checkinDate,
  checkinTime,
  checkoutDate,
  checkoutTime,
  dailyRate,
  prices,
}) => {
  let tienPhongChiTiet = [],
    thoiGianCheckoutMuon = 0,
    thoiGianCheckinSom = 0,
    tongThoiGianThuePhong = 0,
    from,
    to;
  let phuTroiCheckinSomTheoNgay = [],
    phuTroiCheckoutMuonTheoNgay = [];
  (prices || []).forEach((price) => {
    if (price.type == TYPE_EARLYTIME_BY_DAY)
      phuTroiCheckinSomTheoNgay.push({
        numberOfHour: price.number,
        rate: price.rate
      });
    if (price.type == TYPE_OVERTIME_BY_DAY)
      phuTroiCheckoutMuonTheoNgay.push({
        numberOfHour: price.number,
        rate: price.rate
      });
  });
  //TODO: neu checkin va checkout trong cung ngay: tinh gia 1 ngay [return]
  if (
    moment(`${checkoutDate}`, "YYYY-MM-DD")
      .isSame(moment(`${checkinDate}`, "YYYY-MM-DD"))
  ) {
    //TODO: tinh chi phi 1 ngay
    tienPhongChiTiet.push({
      fromDate: `${checkinDate} ${checkinTime}`,
      toDate: `${checkoutDate} ${checkoutTime}`,
      cost: dailyRate,
      desc: "1 Ngày",
      total: 1,
    });
    return { tienPhongChiTiet };
  }

  //Tong thoi gian thue
  let a = moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME);
  let b = moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME);
  tongThoiGianThuePhong = moment.duration(
    a.diff(b)
  ).asHours();

  //TODO: checkout muon sau gio checkout
  if (
    moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME).isAfter(
      moment(`${checkoutDate} ${pointCheckoutDayTime}`, FORMAT.DATE_TIME)
    )
  ) {
    a = moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME);
    b = moment(`${checkoutDate} ${pointCheckoutDayTime}`, FORMAT.DATE_TIME)
    thoiGianCheckoutMuon = moment.duration(a.diff(b)).asHours();
    let phanNguyen = Math.trunc(thoiGianCheckoutMuon);
    const phanThapPhan = thoiGianCheckoutMuon - phanNguyen;
    if (phanThapPhan * 60 > timeToRound) {
      phanNguyen += 1;
    }
    if (phanNguyen > 0) {
      if (phuTroiCheckoutMuonTheoNgay.length <= 0) {
        //TODO: tinh them 1 ngay
        tienPhongChiTiet.push({
          fromDate: moment(`${checkoutDate} ${pointCheckoutDayTime}`),
          toDate: moment(`${checkoutDate} ${checkoutTime}`),
          desc: "1 Ngày",
          cost: dailyRate,
          total: 1,
        });
      } else {
        let maxTime = phuTroiCheckoutMuonTheoNgay.reduce((max, item) => {
          if (item.numberOfHour > max);
          max = item.numberOfHour;
          return max;
        }, 0);
        if (maxTime < phanNguyen) {
          //TODO: tinh them 1 ngay
          tienPhongChiTiet.push({
            fromDate: `${checkoutDate} ${pointCheckoutDayTime}`,
            toDate: `${checkoutDate} ${checkoutTime}`,
            desc: "1 Ngày",
            total: 1,
            cost: dailyRate,
          });
        } else {
          let phutroi = phuTroiCheckoutMuonTheoNgay[0];
          phuTroiCheckoutMuonTheoNgay.forEach((item) => {
            if (
              item.numberOfHour >= phanNguyen &&
              item.numberOfHour < phutroi.numberOfHour
            ) {
              phutroi = { ...item };
            }
          });
          //TODO: tinh theo gia phu troi
          tienPhongChiTiet.push({
            fromDate: `${checkoutDate} ${pointCheckoutDayTime}`,
            toDate: `${checkoutDate} ${checkoutTime}`,
            desc: `~ ${phutroi.numberOfHour}h`,
            cost: phutroi.rate,
            total: 0,
          });
        }
      }
    }
  }

  //TODO: checkin som truoc gio checkin
  if (
    moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME).isBefore(
      moment(`${checkinDate} ${pointCheckinDayTime}`, FORMAT.DATE_TIME)
    )
  ) {
    a = moment(`${checkinDate} ${pointCheckinDayTime}`, FORMAT.DATE_TIME);
    b = moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME);
    thoiGianCheckinSom = moment.duration(a.diff(b)).asHours();
    let phanNguyen = Math.trunc(thoiGianCheckinSom);
    const phanThapPhan = thoiGianCheckinSom - phanNguyen;
    if (phanThapPhan * 60 > timeToRound) {
      phanNguyen += 1;
    }
    if (phanNguyen > 0) {
      if (phuTroiCheckinSomTheoNgay.length <= 0) {
        //TODO: tinh them 1 ngay
        tienPhongChiTiet.push({
          fromDate: `${checkinDate} ${checkinTime}`,
          toDate: `${checkinDate} ${pointCheckinDayTime}`,
          cost: dailyRate,
          desc: "1 Ngày",
          total: 1,
        });
      } else {
        let maxTime = phuTroiCheckinSomTheoNgay.reduce((max, item) => {
          if (item.numberOfHour > max);
          max = item.numberOfHour;
          return max;
        }, 0);
        if (maxTime < phanNguyen) {
          //TODO: tinh them 1 ngay
          tienPhongChiTiet.push({
            fromDate: `${checkinDate} ${checkinTime}`,
            toDate: `${checkinDate} ${pointCheckinDayTime}`,
            cost: dailyRate,
            desc: "1 Ngày",
            total: 1,
          });
        } else {
          let phutroi = phuTroiCheckinSomTheoNgay[0];
          phuTroiCheckinSomTheoNgay.forEach((item) => {
            if (
              item.numberOfHour >= phanNguyen &&
              item.numberOfHour < phutroi.numberOfHour
            ) {
              phutroi = { ...item };
            }
          });
          //TODO: tinh theo gia phu troi
          tienPhongChiTiet.push({
            fromDate: `${checkinDate} ${checkinTime}`,
            toDate: `${checkinDate} ${pointCheckinDayTime}`,
            cost: phutroi.rate,
            desc: `~ ${phutroi.numberOfHour}h`,
            total: 0,
          });
        }
      }
    }
  }

  //TODO: tinh chi phi phong : so ngay con lai = tong - (so thoi gian checkin som + checkout muon)
  const thoiGianConLai = tongThoiGianThuePhong - (thoiGianCheckinSom + thoiGianCheckoutMuon);
  const soNgayThue = Math.round(thoiGianConLai / 24);
  if (soNgayThue > 0) {
    //TODO: them chi phi theo ngay
    tienPhongChiTiet.push({
      fromDate: `${checkinDate} ${pointCheckinDayTime}`,
      toDate: `${checkoutDate} ${pointCheckoutDayTime}`,
      desc: `${soNgayThue} Ngày`,
      cost: dailyRate * soNgayThue,
      total: soNgayThue,
    });
  }
  return { tienPhongChiTiet };
};
const getByHours = ({
  checkinDate,
  checkinTime,
  checkoutDate,
  checkoutTime,
  hourRate,
}) => {
  let tienPhongChiTiet = [];
  //Tong thoi gian thue
  let a = moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME);
  let b = moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME);
  let tongThoiGianThuePhong = moment.duration(
    a.diff(b)
  ).asHours();
  tienPhongChiTiet.push({
    fromDate: `${checkoutDate} ${pointCheckoutDayTime}`,
    toDate: `${checkoutDate} ${checkoutTime}`,
    cost: hourRate * tongThoiGianThuePhong,
    desc: `~ ${tongThoiGianThuePhong}h`,
    total: tongThoiGianThuePhong,
  });
  return { tienPhongChiTiet };
};
const getByOvernight = ({
  checkinDate,
  checkinTime,
  checkoutDate,
  checkoutTime,
  dailyRate,
  overnightRate,
  prices,
}) => {
  let tienPhongChiTiet = [],
    thoiGianCheckoutMuon = 0,
    thoiGianCheckinSom = 0,
    tongThoiGianThuePhong = 0;

  let phuTroiCheckinSomQuaDem = [],
    phuTroiCheckoutMuonQuaDem = [];
  (prices || []).forEach((price) => {
    if (price.type == TYPE_EARLYTIME_BY_NIGHT)
      phuTroiCheckinSomQuaDem.push({
        numberOfHour: price.number,
        rate: price.rate
      });
    if (price.type == TYPE_OVERTIME_BY_NIGHT)
      phuTroiCheckoutMuonQuaDem.push({
        numberOfHour: price.number,
        rate: price.rate
      });
  });

  //Tong thoi gian thue
  let a = moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME);
  let b = moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME);
  tongThoiGianThuePhong = moment.duration(
    a.diff(b)
  ).asHours();

  //checkin som gio qua dem
  if (
    moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME)
      .isBefore(moment(`${checkinDate} ${pointCheckinNightTimeFrom}`, FORMAT.DATE_TIME))
  ) {
    a = moment(`${checkinDate} ${pointCheckinNightTimeFrom}`, FORMAT.DATE_TIME);
    b = moment(`${checkinDate} ${checkinTime}`, FORMAT.DATE_TIME);
    thoiGianCheckinSom = moment.duration(a.diff(b)).asHours();
    let phanNguyen = Math.trunc(thoiGianCheckinSom);
    const phanThapPhan = thoiGianCheckinSom - phanNguyen;
    if (phanThapPhan * 60 > timeToRound) {
      phanNguyen += 1;
    }
    if (phanNguyen > 0) {
      if (phuTroiCheckinSomQuaDem.length <= 0) {

      } else {
        let maxTime = phuTroiCheckinSomQuaDem.reduce((max, item) => {
          if (item.numberOfHour > max);
          max = item.numberOfHour;
          return max;
        }, 0);
        if (maxTime < phanNguyen) {
          //TODO: tinh them 1 ngay
          tienPhongChiTiet.push({
            fromDate: `${checkinDate} ${checkinTime}`,
            toDate: `${checkinDate} ${pointCheckinNightTimeFrom}`,
            cost: dailyRate,
            desc: "1 Ngày",
            total: 1,
          });
        } else {
          let phutroi = phuTroiCheckinSomQuaDem[0];
          phuTroiCheckinSomQuaDem.forEach((item) => {
            if (
              item.numberOfHour >= phanNguyen &&
              item.numberOfHour < phutroi.numberOfHour
            ) {
              phutroi = { ...item };
            }
          });
          //TODO: tinh theo gia phu troi
          tienPhongChiTiet.push({
            fromDate: `${checkinDate} ${checkinTime}`,
            toDate: `${checkinDate} ${pointCheckinNightTimeFrom}`,
            cost: phutroi.rate,
            desc: `~ ${phutroi.numberOfHour}h`,
            total: 0,
          });
        }
      }
    }
  }

  //checkout muon gio qua dem
  if (
    moment(`${checkoutDate} ${checkinTime}`, FORMAT.DATE_TIME)
      .isAfter(moment(`${checkoutDate} ${pointCheckoutDayTime}`, FORMAT.DATE_TIME))
  ) {
    a = moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME);
    b = moment(`${checkoutDate} ${pointCheckoutDayTime}`, FORMAT.DATE_TIME);
    thoiGianCheckoutMuon = moment.duration(a.diff(b)).asHours();
    let phanNguyen = Math.trunc(thoiGianCheckoutMuon);
    const phanThapPhan = thoiGianCheckoutMuon - phanNguyen;
    if (phanThapPhan * 60 > timeToRound) {
      phanNguyen += 1;
    }
    if (phuTroiCheckoutMuonQuaDem.length <= 0) {
      if (
        moment(`${checkoutDate} ${checkoutTime}`, FORMAT.DATE_TIME)
          .isAfter(moment(`${checkoutDate} ${pointCheckinDayTime}`, FORMAT.DATE_TIME))
      ) {
        // TODO: tinh them 1 ngay
        tienPhongChiTiet.push({
          fromDate: `${checkoutDate} ${pointCheckoutDayTime}`,
          toDate: `${checkoutDate} ${checkoutTime}`,
          cost: dailyRate,
          desc: "1 Ngày",
          total: 1,
        });
      }
    } else {
      let maxTime = phuTroiCheckoutMuonQuaDem.reduce((max, item) => {
        if (item.numberOfHour > max);
        max = item.numberOfHour;
        return max;
      }, 0);
      if (maxTime < phanNguyen) {
        //TODO: tinh them 1 ngay
        tienPhongChiTiet.push({
          fromDate: `${checkoutDate} ${pointCheckoutDayTime}`,
          toDate: `${checkoutDate} ${checkoutTime}`,
          cost: dailyRate,
          desc: "1 Ngày",
          total: 1,
        });
      } else {
        let phutroi = phuTroiCheckoutMuonQuaDem[0];
        phuTroiCheckoutMuonQuaDem.forEach((item) => {
          if (
            item.numberOfHour >= phanNguyen &&
            item.numberOfHour < phutroi.numberOfHour
          ) {
            phutroi = { ...item };
          }
        });
        //TODO: tinh theo gia phu troi
        tienPhongChiTiet.push({
          fromDate: `${checkoutDate} ${pointCheckoutDayTime}`,
          toDate: `${checkoutDate} ${checkoutTime}`,
          cost: phutroi.rate,
          desc: `~ ${phutroi.numberOfHour}h`,
          total: 0,
        });
      }
    }
  }

  // TODO: tinh chi phi phong : so ngay con lai = tong - (so thoi gian checkin som + checkout muon)
  const thoiGianConLai = tongThoiGianThuePhong - (thoiGianCheckinSom + thoiGianCheckoutMuon);
  if (thoiGianConLai >= 22) {
    const soNgayThue = Math.round(thoiGianConLai / 24);
    if (soNgayThue && soNgayThue > 0) {
      //TODO: them chi phi theo ngay
      tienPhongChiTiet.push({
        fromDate: `${checkinDate} ${pointCheckinDayTime}`,
        toDate: `${checkoutDate} ${pointCheckoutDayTime}`,
        desc: `${soNgayThue} Ngày`,
        cost: dailyRate * soNgayThue,
        total: soNgayThue,
      });
    }
  }
  else {
    tienPhongChiTiet.push({
      fromDate: `${checkinDate} ${pointCheckinNightTimeFrom}`,
      toDate: `${checkoutDate} ${pointCheckoutDayTime}`,
      desc: `1 Đêm`,
      cost: overnightRate,
      total: 1,
    });
  }
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log(tienPhongChiTiet)
  return { tienPhongChiTiet };
};

module.exports = { getByDaily, getByHours, getByOvernight };