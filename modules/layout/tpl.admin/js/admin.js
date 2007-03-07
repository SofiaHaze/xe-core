/* 레이아웃 신규 생성시 완료 후 요청하는 함수 */
function completeInsertLayout(ret_obj) {
  var layout_srl = ret_obj['layout_srl'];
  location.href="./?module=admin&mo=layout&act=dispLayoutInfo&layout_srl="+layout_srl;
} 

/* 레이아웃 메뉴에를 클릭시 적용할 함수 */
function doGetMenuInfo(menu_id, obj) {
  // layout, menu_id, node_srl을 추출
  var fo_obj = xGetElementById("fo_layout");
  var layout = fo_obj.layout.value;
  var node_srl = 0;
  if(typeof(obj.getAttribute)!="undefined") { 
    node_srl = obj.getAttribute("node_srl");
  } else {
    node_srl = obj.node_srl; 
  }

  var params = new Array();
  params["menu_id"] = menu_id;
  params["layout"] = layout;
  params["menu_srl"] = node_srl;

  // 서버에 요청하여 해당 노드의 정보를 수정할 수 있도록 한다. 
  var response_tags = new Array('error','message','menu_id', 'tpl');
  exec_xml('layout', 'getMenuInfo', params, completeGetMenuInfo, response_tags, params);
}

/* 빈 메뉴 추가시 사용 */
function doInsertLayoutMenu(menu_id) {
  var params = {node_srl:0}
  doGetMenuInfo(menu_id, params);
}

/* 서버로부터 받아온 메뉴 정보를 출력 */
function completeGetMenuInfo(ret_obj, response_tags) {
  var menu_id = ret_obj['menu_id'];
  var tpl = ret_obj['tpl'];
  xInnerHtml("menu_zone_info_"+menu_id, tpl);
}
