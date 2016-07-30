angular.module('dictionaryMaintain').controller('dictionaryController',['$scope', '$http', function ($scope, $http) {
  $scope.dictionaryGrid = {
      enableSorting: true,
      showGridFooter: true,
      showColumnFooter: true,
      enableColumnResizing: true,
      paginationPageSizes: [10, 50, 75],
      paginationPageSize: 10,
      enableRowSelection: true,
      exporterOlderExcelCompatibility: true,
      exporterMenuPdf: false,
      enableFullRowSelection: true
  };
  var dictionaryGridColumnDefs = [
      {
        field: 'category',
        allowCellFocus:false,
        displayName: '类别',
        enableCellEdit: true,
        editableCellTemplate: 'ui-grid/dropdownEditor',
        editDropdownRowEntityOptionsArrayPath: 'allCategorys',
        editDropdownIdLabel: 'value'
      },
      // {field: 'key', displayName:'编码' ,allowCellFocus:false},
      {field: 'value', displayName:'值', allowCellFocus:false},
      {
        field: 'icon',
        displayName:'图标',
        allowCellFocus:false,
        editableCellTemplate: 'ui-grid/dropdownEditor',
        editDropdownRowEntityOptionsArrayPath: 'allIcons',
        editDropdownIdLabel: 'value'
      }
  ];

  $scope.dictionaryGrid.multiSelect = true;
  $scope.dictionaryGrid.modifierKeysToMultiSelect = true;
  $scope.dictionaryGrid.columnDefs = dictionaryGridColumnDefs;

  $scope.dictionaryGrid.onRegisterApi = function( gridApi ) {
      $scope.gridApi = gridApi;
  };

  $scope.getData = function(){
    $scope.allIcons = [
      {value : 'Technique', },
      {value : 'Test'},
      {value : 'Design'},
      {value : 'Service'},
      {value : 'Support'}
     ];
    $http.get('/api/v1/dictionary').then(function(res){
        if(res){
          var allCategorys = [],
              gridDatas = [];
          for (var i = 0; i < res.data.length; i ++) {
            var data = res.data[i];
            if (~['POSITION_TYPE', 'WELFARE_TYPE', 'SEGMENT_TYPE'].indexOf(res.data[i].key)) {
              allCategorys.push(data);
            } else {
              gridDatas.push(data);
            }
          }
          $scope.allCategorys = allCategorys;
          gridDatas.forEach(function (gridData) {
            gridData.allCategorys = allCategorys;
            gridData.allIcons = $scope.allIcons;
          });
          $scope.dictionaryGrid.data = gridDatas;
        }else{
            console.log('rep failed');
        }
    })
  };
  $scope.dictionaryGrid.onRegisterApi = function(gridApi){
    //set gridApi on scope
    $scope.gridApi = gridApi;
    gridApi.edit.on.afterCellEdit($scope, function (row) {
      if (row._id) {
        $http.post('/api/v1/dictionary/'+row._id, row);
      } else {
        $http.post('/api/v1/dictionary', row)
             .then(function (result) {
               console.log(result);
          row._id = result.data._id;
        });
      }
    });
  };
  $scope.create = function () {
    $scope.dictionaryGrid.data.splice(($scope.dictionaryGrid.paginationCurrentPage-1) * $scope.dictionaryGrid.paginationPageSize,0,{
      allCategorys : $scope.allCategorys,
      allIcons : $scope.allIcons
    });
  };

  $scope.delete = function () {
    $scope.gridApi.selection.getSelectedRows().forEach(function (row) {
      $http.delete('/api/v1/dictionary/'+row._id);
      _.remove($scope.dictionaryGrid.data, function (n) {
        return n._id == row._id;
      })
    });
  }
}]);
