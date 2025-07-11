// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        v6.30.2
// source: models/requests.proto

package models

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type RequestArgs struct {
	state         protoimpl.MessageState         `protogen:"open.v1"`
	Filter        *RequestArgs_FilterOptions     `protobuf:"bytes,1,opt,name=filter,proto3,oneof" json:"filter,omitempty"`
	Paging        *RequestArgs_PaginationOptions `protobuf:"bytes,2,opt,name=paging,proto3,oneof" json:"paging,omitempty"`
	SoftDelete    *bool                          `protobuf:"varint,3,opt,name=softDelete,proto3,oneof" json:"softDelete,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *RequestArgs) Reset() {
	*x = RequestArgs{}
	mi := &file_models_requests_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *RequestArgs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestArgs) ProtoMessage() {}

func (x *RequestArgs) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestArgs.ProtoReflect.Descriptor instead.
func (*RequestArgs) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{0}
}

func (x *RequestArgs) GetFilter() *RequestArgs_FilterOptions {
	if x != nil {
		return x.Filter
	}
	return nil
}

func (x *RequestArgs) GetPaging() *RequestArgs_PaginationOptions {
	if x != nil {
		return x.Paging
	}
	return nil
}

func (x *RequestArgs) GetSoftDelete() bool {
	if x != nil && x.SoftDelete != nil {
		return *x.SoftDelete
	}
	return false
}

type UserActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	User          *User                  `protobuf:"bytes,1,opt,name=user,proto3,oneof" json:"user,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *UserActionRequest) Reset() {
	*x = UserActionRequest{}
	mi := &file_models_requests_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *UserActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserActionRequest) ProtoMessage() {}

func (x *UserActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserActionRequest.ProtoReflect.Descriptor instead.
func (*UserActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{1}
}

func (x *UserActionRequest) GetUser() *User {
	if x != nil {
		return x.User
	}
	return nil
}

func (x *UserActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type CustomerActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Customer      *Customer              `protobuf:"bytes,1,opt,name=customer,proto3,oneof" json:"customer,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *CustomerActionRequest) Reset() {
	*x = CustomerActionRequest{}
	mi := &file_models_requests_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *CustomerActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CustomerActionRequest) ProtoMessage() {}

func (x *CustomerActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CustomerActionRequest.ProtoReflect.Descriptor instead.
func (*CustomerActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{2}
}

func (x *CustomerActionRequest) GetCustomer() *Customer {
	if x != nil {
		return x.Customer
	}
	return nil
}

func (x *CustomerActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type ShopActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Shop          *Shop                  `protobuf:"bytes,1,opt,name=shop,proto3,oneof" json:"shop,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *ShopActionRequest) Reset() {
	*x = ShopActionRequest{}
	mi := &file_models_requests_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *ShopActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ShopActionRequest) ProtoMessage() {}

func (x *ShopActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ShopActionRequest.ProtoReflect.Descriptor instead.
func (*ShopActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{3}
}

func (x *ShopActionRequest) GetShop() *Shop {
	if x != nil {
		return x.Shop
	}
	return nil
}

func (x *ShopActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type ProductActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Product       *Product               `protobuf:"bytes,1,opt,name=product,proto3,oneof" json:"product,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *ProductActionRequest) Reset() {
	*x = ProductActionRequest{}
	mi := &file_models_requests_proto_msgTypes[4]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *ProductActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ProductActionRequest) ProtoMessage() {}

func (x *ProductActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[4]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ProductActionRequest.ProtoReflect.Descriptor instead.
func (*ProductActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{4}
}

func (x *ProductActionRequest) GetProduct() *Product {
	if x != nil {
		return x.Product
	}
	return nil
}

func (x *ProductActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type OrderActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Order         *Order                 `protobuf:"bytes,1,opt,name=order,proto3,oneof" json:"order,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *OrderActionRequest) Reset() {
	*x = OrderActionRequest{}
	mi := &file_models_requests_proto_msgTypes[5]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *OrderActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*OrderActionRequest) ProtoMessage() {}

func (x *OrderActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[5]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use OrderActionRequest.ProtoReflect.Descriptor instead.
func (*OrderActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{5}
}

func (x *OrderActionRequest) GetOrder() *Order {
	if x != nil {
		return x.Order
	}
	return nil
}

func (x *OrderActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type CollectionActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Collection    *Collection            `protobuf:"bytes,1,opt,name=collection,proto3,oneof" json:"collection,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *CollectionActionRequest) Reset() {
	*x = CollectionActionRequest{}
	mi := &file_models_requests_proto_msgTypes[6]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *CollectionActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CollectionActionRequest) ProtoMessage() {}

func (x *CollectionActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[6]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CollectionActionRequest.ProtoReflect.Descriptor instead.
func (*CollectionActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{6}
}

func (x *CollectionActionRequest) GetCollection() *Collection {
	if x != nil {
		return x.Collection
	}
	return nil
}

func (x *CollectionActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type TransactionActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Transaction   *Transaction           `protobuf:"bytes,1,opt,name=transaction,proto3,oneof" json:"transaction,omitempty"`
	Args          *RequestArgs           `protobuf:"bytes,2,opt,name=args,proto3,oneof" json:"args,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *TransactionActionRequest) Reset() {
	*x = TransactionActionRequest{}
	mi := &file_models_requests_proto_msgTypes[7]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *TransactionActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TransactionActionRequest) ProtoMessage() {}

func (x *TransactionActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[7]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TransactionActionRequest.ProtoReflect.Descriptor instead.
func (*TransactionActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{7}
}

func (x *TransactionActionRequest) GetTransaction() *Transaction {
	if x != nil {
		return x.Transaction
	}
	return nil
}

func (x *TransactionActionRequest) GetArgs() *RequestArgs {
	if x != nil {
		return x.Args
	}
	return nil
}

type WebhookActionRequest struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *WebhookActionRequest) Reset() {
	*x = WebhookActionRequest{}
	mi := &file_models_requests_proto_msgTypes[8]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *WebhookActionRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*WebhookActionRequest) ProtoMessage() {}

func (x *WebhookActionRequest) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[8]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use WebhookActionRequest.ProtoReflect.Descriptor instead.
func (*WebhookActionRequest) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{8}
}

type RequestArgs_PaginationOptions struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Page          int32                  `protobuf:"varint,1,opt,name=page,proto3" json:"page,omitempty"`
	ItemsPerPage  int32                  `protobuf:"varint,2,opt,name=itemsPerPage,proto3" json:"itemsPerPage,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *RequestArgs_PaginationOptions) Reset() {
	*x = RequestArgs_PaginationOptions{}
	mi := &file_models_requests_proto_msgTypes[9]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *RequestArgs_PaginationOptions) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestArgs_PaginationOptions) ProtoMessage() {}

func (x *RequestArgs_PaginationOptions) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[9]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestArgs_PaginationOptions.ProtoReflect.Descriptor instead.
func (*RequestArgs_PaginationOptions) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{0, 0}
}

func (x *RequestArgs_PaginationOptions) GetPage() int32 {
	if x != nil {
		return x.Page
	}
	return 0
}

func (x *RequestArgs_PaginationOptions) GetItemsPerPage() int32 {
	if x != nil {
		return x.ItemsPerPage
	}
	return 0
}

type RequestArgs_FilterOptions struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Search        string                 `protobuf:"bytes,1,opt,name=search,proto3" json:"search,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *RequestArgs_FilterOptions) Reset() {
	*x = RequestArgs_FilterOptions{}
	mi := &file_models_requests_proto_msgTypes[10]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *RequestArgs_FilterOptions) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RequestArgs_FilterOptions) ProtoMessage() {}

func (x *RequestArgs_FilterOptions) ProtoReflect() protoreflect.Message {
	mi := &file_models_requests_proto_msgTypes[10]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RequestArgs_FilterOptions.ProtoReflect.Descriptor instead.
func (*RequestArgs_FilterOptions) Descriptor() ([]byte, []int) {
	return file_models_requests_proto_rawDescGZIP(), []int{0, 1}
}

func (x *RequestArgs_FilterOptions) GetSearch() string {
	if x != nil {
		return x.Search
	}
	return ""
}

var File_models_requests_proto protoreflect.FileDescriptor

const file_models_requests_proto_rawDesc = "" +
	"\n" +
	"\x15models/requests.proto\x12\brequests\x1a\x11models/core.proto\"\xd5\x02\n" +
	"\vRequestArgs\x12@\n" +
	"\x06filter\x18\x01 \x01(\v2#.requests.RequestArgs.FilterOptionsH\x00R\x06filter\x88\x01\x01\x12D\n" +
	"\x06paging\x18\x02 \x01(\v2'.requests.RequestArgs.PaginationOptionsH\x01R\x06paging\x88\x01\x01\x12#\n" +
	"\n" +
	"softDelete\x18\x03 \x01(\bH\x02R\n" +
	"softDelete\x88\x01\x01\x1aK\n" +
	"\x11PaginationOptions\x12\x12\n" +
	"\x04page\x18\x01 \x01(\x05R\x04page\x12\"\n" +
	"\fitemsPerPage\x18\x02 \x01(\x05R\fitemsPerPage\x1a'\n" +
	"\rFilterOptions\x12\x16\n" +
	"\x06search\x18\x01 \x01(\tR\x06searchB\t\n" +
	"\a_filterB\t\n" +
	"\a_pagingB\r\n" +
	"\v_softDelete\"|\n" +
	"\x11UserActionRequest\x12%\n" +
	"\x04user\x18\x01 \x01(\v2\f.models.UserH\x00R\x04user\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\a\n" +
	"\x05_userB\a\n" +
	"\x05_args\"\x90\x01\n" +
	"\x15CustomerActionRequest\x121\n" +
	"\bcustomer\x18\x01 \x01(\v2\x10.models.CustomerH\x00R\bcustomer\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\v\n" +
	"\t_customerB\a\n" +
	"\x05_args\"|\n" +
	"\x11ShopActionRequest\x12%\n" +
	"\x04shop\x18\x01 \x01(\v2\f.models.ShopH\x00R\x04shop\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\a\n" +
	"\x05_shopB\a\n" +
	"\x05_args\"\x8b\x01\n" +
	"\x14ProductActionRequest\x12.\n" +
	"\aproduct\x18\x01 \x01(\v2\x0f.models.ProductH\x00R\aproduct\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\n" +
	"\n" +
	"\b_productB\a\n" +
	"\x05_args\"\x81\x01\n" +
	"\x12OrderActionRequest\x12(\n" +
	"\x05order\x18\x01 \x01(\v2\r.models.OrderH\x00R\x05order\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\b\n" +
	"\x06_orderB\a\n" +
	"\x05_args\"\x9a\x01\n" +
	"\x17CollectionActionRequest\x127\n" +
	"\n" +
	"collection\x18\x01 \x01(\v2\x12.models.CollectionH\x00R\n" +
	"collection\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\r\n" +
	"\v_collectionB\a\n" +
	"\x05_args\"\x9f\x01\n" +
	"\x18TransactionActionRequest\x12:\n" +
	"\vtransaction\x18\x01 \x01(\v2\x13.models.TransactionH\x00R\vtransaction\x88\x01\x01\x12.\n" +
	"\x04args\x18\x02 \x01(\v2\x15.requests.RequestArgsH\x01R\x04args\x88\x01\x01B\x0e\n" +
	"\f_transactionB\a\n" +
	"\x05_args\"\x16\n" +
	"\x14WebhookActionRequestB+Z)github.com/romvales/moceserver/gen/modelsb\x06proto3"

var (
	file_models_requests_proto_rawDescOnce sync.Once
	file_models_requests_proto_rawDescData []byte
)

func file_models_requests_proto_rawDescGZIP() []byte {
	file_models_requests_proto_rawDescOnce.Do(func() {
		file_models_requests_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_models_requests_proto_rawDesc), len(file_models_requests_proto_rawDesc)))
	})
	return file_models_requests_proto_rawDescData
}

var file_models_requests_proto_msgTypes = make([]protoimpl.MessageInfo, 11)
var file_models_requests_proto_goTypes = []any{
	(*RequestArgs)(nil),                   // 0: requests.RequestArgs
	(*UserActionRequest)(nil),             // 1: requests.UserActionRequest
	(*CustomerActionRequest)(nil),         // 2: requests.CustomerActionRequest
	(*ShopActionRequest)(nil),             // 3: requests.ShopActionRequest
	(*ProductActionRequest)(nil),          // 4: requests.ProductActionRequest
	(*OrderActionRequest)(nil),            // 5: requests.OrderActionRequest
	(*CollectionActionRequest)(nil),       // 6: requests.CollectionActionRequest
	(*TransactionActionRequest)(nil),      // 7: requests.TransactionActionRequest
	(*WebhookActionRequest)(nil),          // 8: requests.WebhookActionRequest
	(*RequestArgs_PaginationOptions)(nil), // 9: requests.RequestArgs.PaginationOptions
	(*RequestArgs_FilterOptions)(nil),     // 10: requests.RequestArgs.FilterOptions
	(*User)(nil),                          // 11: models.User
	(*Customer)(nil),                      // 12: models.Customer
	(*Shop)(nil),                          // 13: models.Shop
	(*Product)(nil),                       // 14: models.Product
	(*Order)(nil),                         // 15: models.Order
	(*Collection)(nil),                    // 16: models.Collection
	(*Transaction)(nil),                   // 17: models.Transaction
}
var file_models_requests_proto_depIdxs = []int32{
	10, // 0: requests.RequestArgs.filter:type_name -> requests.RequestArgs.FilterOptions
	9,  // 1: requests.RequestArgs.paging:type_name -> requests.RequestArgs.PaginationOptions
	11, // 2: requests.UserActionRequest.user:type_name -> models.User
	0,  // 3: requests.UserActionRequest.args:type_name -> requests.RequestArgs
	12, // 4: requests.CustomerActionRequest.customer:type_name -> models.Customer
	0,  // 5: requests.CustomerActionRequest.args:type_name -> requests.RequestArgs
	13, // 6: requests.ShopActionRequest.shop:type_name -> models.Shop
	0,  // 7: requests.ShopActionRequest.args:type_name -> requests.RequestArgs
	14, // 8: requests.ProductActionRequest.product:type_name -> models.Product
	0,  // 9: requests.ProductActionRequest.args:type_name -> requests.RequestArgs
	15, // 10: requests.OrderActionRequest.order:type_name -> models.Order
	0,  // 11: requests.OrderActionRequest.args:type_name -> requests.RequestArgs
	16, // 12: requests.CollectionActionRequest.collection:type_name -> models.Collection
	0,  // 13: requests.CollectionActionRequest.args:type_name -> requests.RequestArgs
	17, // 14: requests.TransactionActionRequest.transaction:type_name -> models.Transaction
	0,  // 15: requests.TransactionActionRequest.args:type_name -> requests.RequestArgs
	16, // [16:16] is the sub-list for method output_type
	16, // [16:16] is the sub-list for method input_type
	16, // [16:16] is the sub-list for extension type_name
	16, // [16:16] is the sub-list for extension extendee
	0,  // [0:16] is the sub-list for field type_name
}

func init() { file_models_requests_proto_init() }
func file_models_requests_proto_init() {
	if File_models_requests_proto != nil {
		return
	}
	file_models_core_proto_init()
	file_models_requests_proto_msgTypes[0].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[1].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[2].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[3].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[4].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[5].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[6].OneofWrappers = []any{}
	file_models_requests_proto_msgTypes[7].OneofWrappers = []any{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_models_requests_proto_rawDesc), len(file_models_requests_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   11,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_models_requests_proto_goTypes,
		DependencyIndexes: file_models_requests_proto_depIdxs,
		MessageInfos:      file_models_requests_proto_msgTypes,
	}.Build()
	File_models_requests_proto = out.File
	file_models_requests_proto_goTypes = nil
	file_models_requests_proto_depIdxs = nil
}
