import { Component } from '@angular/core';
import { ISort, ITablePagination } from "./table/table.types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = [
    {
      "firstName": "Ihor2",
      "lastName": "Zhr1",
      "ssn": "234234",
      "mrn": "34324",
      "id": 21662,
      "dob": "2020-05-16",
      "sex": "Intersex / Other"
    },
    {
      "firstName": "Anna",
      "lastName": "Last",
      "ssn": "",
      "mrn": "1314145141411",
      "id": 21677,
      "dob": "2020-05-13",
      "sex": "male"
    },
    {
      "firstName": "Oleg",
      "lastName": "Semko",
      "ssn": "1245789",
      "mrn": "457890",
      "id": 21693,
      "dob": "2020-11-03",
      "sex": "male"
    },
    {
      "firstName": "anna",
      "lastName": "last",
      "ssn": "",
      "mrn": "8909809890",
      "id": 21791,
      "dob": "2020-05-06",
      "sex": "female"
    },
    {
      "firstName": "anna",
      "lastName": "last",
      "ssn": "",
      "mrn": "242524242",
      "id": 21792,
      "dob": "2020-05-07",
      "sex": "female"
    },
    {
      "firstName": "anna",
      "lastName": "last",
      "ssn": "",
      "mrn": "241414414",
      "id": 21793,
      "dob": "2020-05-07",
      "sex": "female"
    },
    {
      "firstName": "qaqa",
      "lastName": "qaqa",
      "ssn": "",
      "mrn": "ASD",
      "id": 21886,
      "dob": "2020-06-02",
      "sex": "male"
    },
    {
      "firstName": "test",
      "lastName": "test",
      "ssn": "TEST",
      "mrn": "UGUGUG",
      "id": 21897,
      "dob": "2020-06-03",
      "sex": "male"
    },
    {
      "firstName": "F test",
      "lastName": "L test",
      "ssn": "",
      "mrn": "344344",
      "id": 21898,
      "dob": "2020-06-02",
      "sex": "Intersex / Other"
    },
    {
      "firstName": "Rob",
      "lastName": "Bailey",
      "ssn": "",
      "mrn": "832978329",
      "id": 22033,
      "dob": "2019-02-02",
      "sex": "male"
    },
    {
      "firstName": "test_1_1",
      "lastName": "test_1_1_ln",
      "ssn": "",
      "mrn": "EEEEE",
      "id": 22055,
      "dob": "2020-05-06",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "FDFSDFSDF",
      "id": 22069,
      "dob": "2020-06-15",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "FDFSDFSDF",
      "id": 22070,
      "dob": "2020-06-15",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "luts",
      "ssn": "",
      "mrn": "DRTT",
      "id": 22074,
      "dob": "2020-06-01",
      "sex": "female"
    },
    {
      "firstName": "Iryna",
      "lastName": "luts",
      "ssn": "",
      "mrn": "DRTT",
      "id": 22075,
      "dob": "2020-06-01",
      "sex": "female"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "JGHNFF",
      "id": 22077,
      "dob": "2020-06-02",
      "sex": "male"
    },
    {
      "firstName": "Irynnnnn",
      "lastName": "Lutsss",
      "ssn": "",
      "mrn": "GFGFH",
      "id": 22078,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "CV",
      "id": 22079,
      "dob": "2020-06-02",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "luts",
      "ssn": "",
      "mrn": "DVDV",
      "id": 22081,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "SD",
      "id": 22082,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "ASDA",
      "id": 22087,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "ASDA",
      "id": 22088,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "GHJG",
      "id": 22089,
      "dob": "2020-06-02",
      "sex": "male"
    },
    {
      "firstName": "Only for Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "FGFHDFGD",
      "id": 22090,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts2",
      "ssn": "",
      "mrn": "GDF",
      "id": 22102,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "ll",
      "ssn": "",
      "mrn": "CVGHTH",
      "id": 22103,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts",
      "ssn": "",
      "mrn": "DGDG",
      "id": 22105,
      "dob": "2020-06-16",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "luts3",
      "ssn": "",
      "mrn": "FHFHBFG",
      "id": 22109,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Iryna",
      "lastName": "Luts1",
      "ssn": "",
      "mrn": "FGFHX",
      "id": 22110,
      "dob": "2020-06-01",
      "sex": "male"
    },
    {
      "firstName": "Sasha",
      "lastName": "Test q",
      "ssn": "11111111111111111111",
      "mrn": "11111111111111111111",
      "id": 22112,
      "dob": "2020-06-18",
      "sex": "male"
    }
  ];
  scrolledDistance: number;
  sorting: ISort;
  isLoading = false;
  limit = 20;

  pagination: ITablePagination = {
    page: 0,
    total: 100,
    offset: 0,
    lastChunkSize: 10
  };

  scroll(event) {
    console.warn(event)
  }

  sortData(sort) {
    console.warn(sort)
  }

  infinityScroll(scroll) {
    console.warn(scroll)
  }
}
