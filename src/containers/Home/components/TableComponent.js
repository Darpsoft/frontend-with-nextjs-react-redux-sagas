import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Popconfirm, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Search from "antd/lib/input/Search";
import { customUseReducer } from "@utils/customHooks";
import * as _ from "lodash";

const mookBookings = {
  key: 1,
  bookingFields:
    '{"extras":[{"id":1,"description":"Refrigerador","imageUri":"img%2Ficon-refrigerador.png","time":"0.5","checked":false},{"id":2,"description":"Horno","imageUri":"img%2Ficon-horno.png","time":"0.5","checked":false},{"id":3,"description":"Lavado Ropa","imageUri":"img%2Ficon-lavado.png","time":"0.5","checked":false},{"id":4,"description":"Secado Ropa","imageUri":"img%2Ficon-secado.png","time":"1","checked":false},{"id":5,"description":"Planchado","imageUri":"img%2Ficon-plancha.png","time":"1","checked":true},{"id":6,"description":"Interior Vidrios","imageUri":"img%2Ficon-vidrios.png","time":"1.5","checked":false}],"pets":false,"selectedRooms":2,"selectedBathrooms":2,"isCarpeted":true,"location":{"streetAddress":"Crescente Errázuriz 401, Ñuñoa, Ñuñoa, Región Metropolitana, Chile","locationId":1212,"city":"Santiago","commune":"Ñuñoa","apartmentNumber":"912"},"frecuency":4,"date":"11-07-2016","time":"16:00","paymentType":{},"selectedLamps":2,"selectedBulbs":0,"selectedExtractors":1,"selectedHoods":0,"stairRequired":"No","selectedPlugs":1,"selectedSwitches":0,"selectedTvs":1,"concreteWall":true,"willProvideSupport":false,"tvSizeGreaterThan42":false,"willProvideHelp":false,"bookingRole":"PRO_CLEAN_HOUSE","buildSelector":"dpto","buildType":"tipo_2","backyardClean":true,"elementSize":"medium","workType":"Instalación","taps":1,"tubs":1,"wcs":1,"toiletOpen":true,"disherOpen":false,"handwasherOpen":false,"sewerageOpen":false,"waterLine":true,"gasLine":true,"thermos":1,"stoves":1,"washers":1,"haveTaps":false,"needDrain":false,"bathTaps":0,"smallFrames":0,"largeFrames":0,"locks":1,"cylinders":0,"haveMaterials":true,"tapsRemove":true,"bathTapsRemove":true,"tubsRemove":true,"wcsRemove":true,"recurrency":0,"holidays":false,"gasEnergyType":"natural","thermosOutputType":"forzado","bookingAddHours":0,"replaceSameThermo":false,"cupon":"TUTENBCH","ironHours":2,"curtains":1,"haveCylinders":false,"removeLocks":true,"cuponDetail":"10%","o":"origin","originApp":"WEBAPP"}',
  bookingChecklistData:
    '{"rooms":[{"number":1,"checked":true,"$$hashKey":"object:59","date":"20:11"},{"number":2,"checked":true,"$$hashKey":"object:60","date":"20:11"}],"bathrooms":[{"number":1,"checked":true,"$$hashKey":"object:63","date":"20:11"},{"number":2,"checked":true,"$$hashKey":"object:64","date":"20:11"}],"extras":[{"id":5,"description":"Planchado","checked":true,"time":"1","imageUri":"img%2Ficon-plancha.png","$$hashKey":"object:57","date":"20:11"}],"livingRoom":[{"checked":true,"number":1,"$$hashKey":"object:68","date":"20:11"}],"kitchen":[{"checked":true,"number":1,"$$hashKey":"object:70","date":"20:11"}],"diningRoom":[{"checked":true,"number":1,"$$hashKey":"object:72","date":"20:11"}],"logia":[{"checked":true,"number":1,"$$hashKey":"object:74","date":"20:11"}]}',
  bookingDurationTime: 4.5,
  recurrentWeeks: 4,
  tutenUserProfessionalRole: {
    userRole: "PRO_CLEAN_HOUSE",
    description: "limpieza de hogar",
    fatherUserRole: "ADMIN_INTERMEDIARIO",
    domain: "tuten",
    estatus: null,
    defaultNamespace: null,
    id: 10,
  },
  bookingStatusTime: 1468283099904,
  bookingCreatedTime: 1467819544990,
  tutenUserProfessional: {
    weekAvailability: "{}",
    hourAvailability: "{}",
    serviceData:
      '[{"id":1,"name":"Limpieza de casa","checked":true},{"id":2,"name":"Limpieza de oficina","checked":true},{"id":3,"name":"Limpieza de alfombras","checked":false},{"id":4,"name":"Lámparas","checked":false},{"id":5,"name":"Extractores y campanas","checked":false},{"id":6,"name":"Enchufes e interruptores","checked":false},{"id":7,"name":"Trabajo a la medida","checked":false},{"id":8,"name":"Montaje de TV","checked":false},{"id":9,"name":"Instalación de cuadros","checked":false},{"id":10,"name":"Armado de muebles","checked":false},{"id":11,"name":"Mudanza","checked":false},{"id":12,"name":"Cerrajería","checked":false},{"id":13,"name":"Trabajo a la medida","checked":false},{"id":14,"name":"Desagues","checked":false},{"id":15,"name":"Grifería","checked":false},{"id":16,"name":"WC","checked":false},{"id":17,"name":"Sifones","checked":false},{"id":18,"name":"Trabajo a la medida","checked":false},{"id":19,"name":"Pintura interior","checked":false}]',
    referrers: '{"0":{"phone":"88185993","name":"magdalena irarrazabal"},"1":{"name":"carmen gloria"}}',
    whyTuten: "[]",
    tutenRoleList: [
      {
        userRole: "PRO_CLEAN_OFFICE",
        description: "limpieza de oficina",
        fatherUserRole: "ADMIN_INTERMEDIARIO",
        domain: "tuten",
        estatus: null,
        defaultNamespace: null,
        id: 12,
      },
      {
        userRole: "PRO_CLEAN_HOUSE",
        description: "limpieza de hogar",
        fatherUserRole: "ADMIN_INTERMEDIARIO",
        domain: "tuten",
        estatus: null,
        defaultNamespace: null,
        id: 10,
      },
      {
        userRole: "PRO_CLEAN_PARTY",
        description: "limpieza carrete",
        fatherUserRole: "ADMIN_INTERMEDIARIO",
        domain: "tuten",
        estatus: null,
        defaultNamespace: null,
        id: 13,
      },
      {
        userRole: "PRO_CLEAN_IRON",
        description: "planchado",
        fatherUserRole: "ADMIN_INTERMEDIARIO",
        domain: "tuten",
        estatus: null,
        defaultNamespace: null,
        id: 11,
      },
    ],
    active: 1,
    tutenUser: "andrea.aco321@gmail.com",
    legallyElegibleToWork: false,
    paidYearsExperience: 10,
    experience: false,
    willingToBackgroundCheck: false,
    declaredCommitedCrime: false,
    referred: null,
    workExperience: " ",
    shirtSize: " ",
    maxHoursPerWeek: 0,
    workPetsAround: false,
    training: " ",
    applicationStep: 1,
    score: 1.6176853055916776,
    applyDate: 1448586795820,
    birthdate: 1448582400000,
    transportation: " ",
    smartphone: "Android",
    bankAccount: false,
    referredBy: '{"name":"Pro se encuentra embarazada. No contesta más el teléfono."}',
    apartmentNumber: "casa",
    city: "Maipo",
    country: " ",
    rut: "156174750",
    skills: " ",
    state: "san bernardo",
    streetAddress: "Carirriñe 15310, San Bernardo, Región Metropolitana, Chile",
    zipcode: " ",
    comments: "CuentaRut",
    gender: " ",
    tutenUser1: {
      serviceData: null,
      userAvailability:
        '{"monday":{"morning":true,"afternoon":true,"night":true},"tuesday":{"morning":true,"afternoon":true,"night":true},"wednesday":{"morning":true,"afternoon":true,"night":true},"thursday":{"morning":true,"afternoon":true,"night":true},"friday":{"morning":true,"afternoon":true,"night":true},"saturday":{"morning":true,"afternoon":true,"night":true},"sunday":{"morning":true,"afternoon":true,"night":true}}',
      sessionTokenBck: null,
      firstName: "andrea bernardita",
      lastName: "acosta barra",
      email: "andrea.aco321@gmail.com",
      active: false,
      passwordHash: "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
      sessionTokenWeb: "andrea.aco321@gmail.comva8d61dscsesdo80ueufith9a6",
      phoneNumber: "71484918",
      agreedToTermsOfUse: true,
      whereKnownUs: "Bolsas Laborales",
      lastLogin: 1539123768749,
      sessionTokenCli: "andrea.aco321@gmail.com1pn8f5gl0f1psnv0hp4pic1rh9",
      sessionTokenPro: "jagfhtgfv7mgg6bmg4uaa5ad9m",
      funds: null,
      tokenFacebook:
        "CAAWrZB93XrVoBACDUDpmM7bIMfkfZCpeqYLrqeudLWIGZAg16Htl2fEp4L6tsNJTb5p2rUOAHUmFyoZCZCos4pqf5E3f9Hmi1CTowYrewzkZCrMssT4s3O7NA9OBGcLf2T0t4n5Vn3cUrBgKXllMixTLGv5y7OOJ6i6bZA8GQ3xnJ8l4CN0uTx1CEn9OnsvUOEDGsqszU9BC6wjN097GZBuR",
      tokenGoogle: null,
      tokensIonic:
        "fr4TY9SytGI:APA91bG5lASCwt1yN_feYOt5aJ3MT8NiiXlC8eeNCquvjBUujrD0_SKqcQL-EFRzazviUYUH7qSX7DOMsSXMvctwPu0EFVrqrmbUYLMOX7v4KBZK1H_cN0To3C4hBGG4ciEfZX31g8vv",
      photoPath: null,
      photoExt: null,
      userRole: { userRole: "PRO", description: "", fatherUserRole: null, domain: "tuten", estatus: null, defaultNamespace: null, id: 3 },
      sync: -3549,
      usedCodeList: "",
      referrer: "AND125G",
      rut: null,
      domain: "tuten",
      typeProfessional: "externo",
      tutenSubRole: null,
      userId: 8383,
      appVersion: "0.4.2",
      estatus: null,
    },
    bank: "BANCO DEL ESTADO DE CHILE",
    bankCode: "0012",
    bankAccountNumber: "15617475",
    bankAccountType: "Rut",
    hasTraining: true,
    wonderlic: 0,
    workCommunes: null,
    latitude: -33.5976459,
    longitude: -70.6894244,
    region: null,
    locationW: -70.68924163,
    locationS: -33.59783114,
    materialsProvided: null,
    lastLocation:
      '{"provider":"gps","time":1.556995876E12,"latitude":-33.59783114,"longitude":-70.68924163,"accuracy":12.86400032043457,"speed":0.0,"altitude":602.4078369140625,"locationProvider":0}',
    inactivityWarning: false,
    inactivityWarningDate: null,
    intermediary: null,
    bankRut: "0970300007",
    company: null,
    companyRut: null,
    companyPhone: null,
    commercialBusiness: null,
  },
  bookingTime: 1468252800000,
  bookingId: 1182,
  bookingState: -3,
  bookingPrice: 18336,
  locationId: {
    streetAddress: "Crescente Errázuriz 401, Ñuñoa, Ñuñoa, Región Metropolitana, Chile",
    apartmentNumber: "912",
    country: "Chile",
    city: "Santiago",
    state: null,
    zipCode: null,
    locationId: 1212,
    commune: "Ñuñoa",
    region: "RM",
    county: null,
    active: true,
    tutenUser: {
      serviceData: "{}",
      userAvailability: null,
      sessionTokenBck: null,
      firstName: "Felipe",
      lastName: "Chacon Vargas",
      email: "felipechacon@yahoo.com",
      active: true,
      passwordHash: null,
      sessionTokenWeb: "idkl1h1lptf5b4nfcdqduksks3",
      phoneNumber: "96476551",
      agreedToTermsOfUse: false,
      whereKnownUs: null,
      lastLogin: 1468891171665,
      sessionTokenCli: "suvl4lq9n25seilmh33u6b0cig",
      sessionTokenPro: null,
      funds: 0,
      tokenFacebook: null,
      tokenGoogle: null,
      tokensIonic: null,
      photoPath: null,
      photoExt: null,
      userRole: { userRole: "CUSTOMER", description: "", fatherUserRole: null, domain: "tuten", estatus: null, defaultNamespace: null, id: 2 },
      sync: 0,
      usedCodeList: "",
      referrer: "FELIPE5014",
      rut: null,
      domain: "tuten",
      typeProfessional: "externo",
      tutenSubRole: null,
      userId: 1003,
      appVersion: null,
      estatus: null,
    },
    latitude: -33.4574944,
    longitude: -70.62514139999999,
  },
  paymentId: {
    paymentPaypalCardToken: null,
    paymentName: "WebPay Oneclick - Visa **** 6936",
    paymentType: "3",
    paymentState: null,
    paymentId: 6840,
    paymentData:
      '{"expressCheckoutResponse":{"token":"123412341234132412341234","timestamp":"2016-05-06T19:01:20Z","ack":"SUCCESS","correlationID":"123412341234","errors":[],"version":"104.0","build":"21799703"},"redirectURL":"https://www.paypal.com/cgi-bin/webscr?cmd\\u003d_express-checkout\\u0026token\\u003d"}',
    active: true,
  },
  tutenUserClient: {
    serviceData: "{}",
    userAvailability: null,
    sessionTokenBck: "contacto@tuten.cljv71ukenuaudfprd8diq1n0947",
    firstName: "Juan",
    lastName: "Perez",
    email: "contacto@tuten.cl",
    active: true,
    passwordHash: "A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=",
    sessionTokenWeb: "contacto@tuten.cljv71ukenuaudfprd8diq1n0947",
    phoneNumber: "25677864",
    agreedToTermsOfUse: false,
    whereKnownUs: null,
    lastLogin: 1569332485059,
    sessionTokenCli: "84o8i4o2d8kanmblsm1scouf8b",
    sessionTokenPro: null,
    funds: 0,
    tokenFacebook: null,
    tokenGoogle: null,
    tokensIonic: null,
    photoPath: null,
    photoExt: null,
    userRole: { userRole: "PRO", description: "", fatherUserRole: null, domain: "tuten", estatus: null, defaultNamespace: null, id: 3 },
    sync: 0,
    usedCodeList: "",
    referrer: "JUAN5990",
    rut: null,
    domain: "tuten",
    typeProfessional: "externo",
    tutenSubRole: null,
    userId: 6123,
    appVersion: null,
    estatus: null,
  },
  score: 5,
  details: "No hay comentarios extra",
  comments: null,
  commentsPro: null,
  commentsClient: null,
  cost: 14375,
  paid: 18336,
  professionalPrice: 12875,
  professionalBonus: 1500,
  bookingInitiateTime: 1468269121533,
  bookingFinishTime: 1468283099907,
  stateExtraData: null,
  proPaid: null,
  formPaid: null,
  to: null,
  paymentResult:
    '{"buyOrder":"20160706153904991","payOutput":{"authorizationCode":"076601","creditCardType":"VISA","last4CardDigits":"6936","responseCode":0,"transactionId":473194366}}',
  recurrency: null,
  parentBooking: null,
  assignedProEmailSent: true,
  bookingInitMatch: 1467996034212,
  bookingSubState: null,
  proPayment: null,
  nullifyResult: null,
  listPrice: null,
  childSubState: null,
  nextChildCreationAttempt: null,
  mapHash: null,
  formData: null,
  textTasks: null,
  arrivalDate: null,
  uninitiatedPushSent: null,
  couponDiscount: null,
  coupon: null,
  namespace: null,
  bookingDomain: null,
  token: "d7bf327a-2497-4ea1-b30d-f000146f5bf1-1182",
  frameworkId: null,
  domain: "tuten",
  selectedRecurrency: null,
  seenProDate: null,
  lastChildBooking: null,
  calcPrice: null,
  calcProPrice: null,
  suppliesCost: null,
  kilometers: null,
  salesChannel: null,
  bookingOnDemand: false,
  quotationState: 0,
  tags: [],
  attachment: null,
  caseId: null,
  bookingAceptedAt: null,
};

const getDataSource = (values) =>
  values?.map((values, key) => ({
    key,
    ...values,
    client: `${values.tutenUserClient.firstName} ${values.tutenUserClient.lastName}`,
  }));

const filter = {
  filters: (field, values) =>
    Object.keys(
      values.reduce((accumulator, currentValue) => {
        return {
          ...accumulator,
          [currentValue[field]]: true,
        };
      }, {})
    ).map((filter) => ({
      text: filter,
      value: filter,
    })),
};

const getColumn = ({ handleEdit, handleDelete, dataSource, getColumnSearchProps }) => {
  return [
    {
      width: 120,
      title: "BookingId",
      dataIndex: "bookingId",
      key: "bookingId",
      sorter: (a, b) => parseInt(a.bookingId) - parseInt(b.bookingId),
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      ellipsis: true,
      filters: filter.filters("client", dataSource),
      onFilter: (value, record) => value === record.client,
    },
    {
      title: "Dirección",
      dataIndex: "locationId",
      key: "locationId",
      ellipsis: true,
      render: (values) => values.streetAddress,
    },
    {
      title: "Fecha de creación",
      dataIndex: "bookingTime",
      key: "bookingTime",
      width: 140,
      render: (values) => {
        return moment(values).format("YYYY-MM-DD");
      },
    },
    {
      title: "Precio",
      dataIndex: "bookingPrice",
      key: "bookingPrice",
      sorter: (a, b) => parseInt(a.bookingPrice) - parseInt(b.bookingPrice),
      width: 130,
      ...getColumnSearchProps("Precio"),
    },
    {
      width: 120,
      title: "",
      render: (_, record) => (
        <>
          <Tooltip title="Editar">
            <Button shape="circle" style={{ marginBottom: 0 }} onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm placement="bottomRight" title={"Estas seguro en eliminar: "} onConfirm={() => handleDelete(record)} okText="Si" cancelText="No">
              <Button shape="circle" style={{ marginBottom: 0 }} icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];
};

const initialState = {
  dataSource: [],
  loading: false,
  search: {
    bookingPrice: null,
  },
};

export const TableComponent = ({ openModal }) => {
  const { auth, home } = useSelector((store) => store);
  const [state, dispatchComponent] = customUseReducer(initialState);

  useEffect(() => {
    dispatchComponent({ dataSource: home.data });
  }, [home.data]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={state.search.bookingPrice}
          onChange={(e) => dispatchComponent((state) => _.set(state, "search.bookingPrice", e.target.value))}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button onClick={() => handlePrice("<=", confirm)} size="small" style={{ width: 90 }}>
            Desde
          </Button>
          <Button onClick={() => handlePrice(">=", confirm)} size="small" style={{ width: 90 }}>
            Hasta
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              dispatchComponent((state) => _.set(state, "search.bookingPrice", null));
              handlePrice("", confirm);
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
  });

  const handleEdit = (values) => {
    console.log("🚀 ~ file: TableComponent.js ~ line 44 ~ handleEdit ~ values", values);
  };

  const handleDelete = (values) => {
    console.log("🚀 ~ file: TableComponent.js ~ line 48 ~ handleDelete ~ values", values);
  };

  const handleSearch = (params) => {
    dispatchComponent({ loading: true });
    setTimeout(() => {
      dispatchComponent({
        dataSource: home.data.filter(({ tutenUserClient, bookingId }) => {
          return tutenUserClient.firstName.includes(params) || tutenUserClient.lastName.includes(params) || bookingId.toString().includes(params);
        }),
        loading: false,
      });
    }, 300);
  };

  const handlePrice = (params, confirm) => {
    params !== "" && confirm();
    dispatchComponent({ loading: true });
    setTimeout(() => {
      dispatchComponent((state) => ({
        dataSource: home.data.filter(({ bookingPrice }) => {
          switch (params) {
            case ">=":
              return parseInt(state.search.bookingPrice) >= parseInt(bookingPrice);
            case "<=":
              return parseInt(state.search.bookingPrice) <= parseInt(bookingPrice);
            case "":
              return true;
          }
        }),
        loading: false,
      }));
    }, 300);
  };

  const dataSource = useMemo(() => getDataSource(state.dataSource), [state.dataSource]);
  const columns = getColumn({ handleDelete, handleEdit, dataSource, getColumnSearchProps });

  return (
    <>
      <Search
        placeholder="Buscar por Nombre y Apellido ó Número de Reservación"
        className="gx-mb-3"
        allowClear
        onSearch={handleSearch}
        enterButton="Buscar"
        size="large"
      />
      <Table size="small" loading={auth.loader || state.loading} className="gx-table-responsive" columns={columns} dataSource={dataSource} />
    </>
  );
};
