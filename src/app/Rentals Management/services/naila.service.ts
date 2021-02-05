import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainAppSetting } from 'src/app/conatants/MainAppSetting';

@Injectable({
  providedIn: 'root'
})
export class NailaService {
  constructor(
    private http: HttpClient,
    private appSettings: MainAppSetting
  ) { }

  getEstimateById(id): Observable<any> {
    return this.http.get(`${this.appSettings.getApi()}/api/estimate/${id}?populate=statusChangedBy`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        })
      });
  }
  updateEstimate(data): Observable<any> {
    return this.http.post(`${this.appSettings.getApi()}/api/estimate/${data._id}`, data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        })
      });
  }


listBanners():Observable<any>{
  return this.http.get(`${this.appSettings.getApi()}/products/getRelatedProductD`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    //   Authorization: localStorage.getItem('token')
    credentials: 'include',

              
  }),
  withCredentials:true,
  })
}

  apartmentList() {
    return this.http.get(`${this.appSettings.getApi()}/api/v1/apartments/active`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      });
  }


  browseBycategory(){
    return this.http.get(`${this.appSettings.getApi()}/api/v1/categories/active`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      //   Authorization: localStorage.getItem('token')
      })
    })
  }


  selectedCategory(data){
    return this.http.get(`${this.appSettings.getApi()}/api/v1/categories/${data}/services`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      //   Authorization: localStorage.getItem('token')
      })
    })
  }





// 

listAllBookings(data){
  return this.http.get(`${this.appSettings.getApi()}/api/v1/bookings/users/${data}`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    //   Authorization: localStorage.getItem('token')
    })
  })
}



listAllTickets(data){
  return this.http.get(`${this.appSettings.getApi()}/api/v1/tickets/${data}`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    //   Authorization: localStorage.getItem('token')
    })
  })
}





listserviceByid(id){
  return this.http.get(`${this.appSettings.getApi()}/api/v1/services/${id}`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    // Authorization: localStorage.getItem('token')
    })
  })
}
applyCoupon(data){
  return this.http.get(`${this.appSettings.getApi()}/api/v1/bookings/coupons/${data}`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    // Authorization: localStorage.getItem('token')
    })
  })
}
getAvailbleSlots(data){
  return this.http.post(`${this.appSettings.getApi()}/api/v1/bookings/get_slots`, data,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}

createBooking(data){
  return this.http.post(`${this.appSettings.getApi()}/api/v1/bookings`, data,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}



createTicket(data){
  return this.http.post(`${this.appSettings.getApi()}/api/v1/tickets`, data,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}


markAttendance(data){
  return this.http.post(`${this.appSettings.getApi()}/api/v1/attendances/punch_in`, data,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}


updateAttendance(data,punchin_id){
  return this.http.put(`${this.appSettings.getApi()}/api/v1/attendances/ ${punchin_id}/punch_out`, data,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}



getBookingForBeautician(data){
  return this.http.get(`${this.appSettings.getApi()}/api/v1/bookings/beauticians/${data}`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    // Authorization: localStorage.getItem('token')
    })
  })
}


updatepaymentStatus(paymentdata,data){
  return this.http.put(`${this.appSettings.getApi()}/api/v1/bookings/${data.id}`, paymentdata,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}




//nowverifyit api


callGetTag(id){
  // nfc/get


  return this.http.get(`${this.appSettings.getApi()}/nfc/get/${id}/2`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    // Authorization: localStorage.getItem('token')
    credentials: 'include',
    })
  })
}



callRecordScan(data){
  return this.http.get(`${this.appSettings.getApi()}/nfc/recordscan/${data.tagId}?location=${data.location}&lat=${data.lat}&long=${data.long}&pincode=${data.pincode}&city=${data.city}&state=${data.state}&country=${data.country}`,
  {
    headers: new HttpHeaders({
      
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      credentials: 'include',

      
    }),
    withCredentials:true,

  }
  );
}


callPostBoughtIt(tagId): Observable<any> {


  return this.http.post(`${this.appSettings.getApi()}/nfc/bought`, tagId,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });

}


writeNFCQRcodedata(data):Observable<any>{

  return this.http.post(`${this.appSettings.getApi()}/nfc/post/${data.name}/${data.place}`,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
    })
  });
}


genetateOTP(data):Observable<any>{

  return this.http.get(`${this.appSettings.getApi()}/nfc/sendsms/${data}`,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
      credentials: 'include',

              
    }),
    withCredentials:true,
  });
}


submitOTP(data):Observable<any>{

  return this.http.get(`${this.appSettings.getApi()}/nfc/authPurchase/${data.tagId}/${data.otp}`,
  {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token')
      credentials: 'include',

              
    }),
    withCredentials:true,
  });
}

listRelatedProducts(data){
  return this.http.get(`${this.appSettings.getApi()}/products/getRelatedProductDetails/${data}`,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    //   Authorization: localStorage.getItem('token')
    credentials: 'include',

              
  }),
  withCredentials:true,
  })
}

}
