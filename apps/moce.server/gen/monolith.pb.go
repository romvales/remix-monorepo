// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.6
// 	protoc        v6.30.2
// source: monolith.proto

package gen

import (
	models "github.com/romvales/moceserver/gen/models"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	anypb "google.golang.org/protobuf/types/known/anypb"
	reflect "reflect"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

var File_monolith_proto protoreflect.FileDescriptor

const file_monolith_proto_rawDesc = "" +
	"\n" +
	"\x0emonolith.proto\x12\bmonolith\x1a\x12models/props.proto\x1a\x15models/requests.proto\x1a\x16models/responses.proto\x1a\x19google/protobuf/any.proto2\xd5 \n" +
	"\x13MoceMonolithService\x126\n" +
	"\x05hello\x12\x14.models.HelloRequest\x1a\x15.models.HelloResponse\"\x00\x129\n" +
	"\tmoceStats\x12\x14.google.protobuf.Any\x1a\x14.google.protobuf.Any\"\x00\x12H\n" +
	"\bsaveUser\x12\x1b.requests.UserActionRequest\x1a\x1d.responses.UserActionResponse\"\x00\x12G\n" +
	"\agetUser\x12\x1b.requests.UserActionRequest\x1a\x1d.responses.UserActionResponse\"\x00\x12J\n" +
	"\n" +
	"deleteUser\x12\x1b.requests.UserActionRequest\x1a\x1d.responses.UserActionResponse\"\x00\x12H\n" +
	"\bgetUsers\x12\x1b.requests.UserActionRequest\x1a\x1d.responses.UserActionResponse\"\x00\x12S\n" +
	"\x13getSoftDeletedUsers\x12\x1b.requests.UserActionRequest\x1a\x1d.responses.UserActionResponse\"\x00\x12J\n" +
	"\n" +
	"countUsers\x12\x1b.requests.UserActionRequest\x1a\x1d.responses.UserActionResponse\"\x00\x12T\n" +
	"\fsaveCustomer\x12\x1f.requests.CustomerActionRequest\x1a!.responses.CustomerActionResponse\"\x00\x12S\n" +
	"\vgetCustomer\x12\x1f.requests.CustomerActionRequest\x1a!.responses.CustomerActionResponse\"\x00\x12V\n" +
	"\x0edeleteCustomer\x12\x1f.requests.CustomerActionRequest\x1a!.responses.CustomerActionResponse\"\x00\x12T\n" +
	"\fgetCustomers\x12\x1f.requests.CustomerActionRequest\x1a!.responses.CustomerActionResponse\"\x00\x12_\n" +
	"\x17getSoftDeletedCustomers\x12\x1f.requests.CustomerActionRequest\x1a!.responses.CustomerActionResponse\"\x00\x12V\n" +
	"\x0ecountCustomers\x12\x1f.requests.CustomerActionRequest\x1a!.responses.CustomerActionResponse\"\x00\x12H\n" +
	"\bsaveShop\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12G\n" +
	"\agetShop\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12J\n" +
	"\n" +
	"deleteShop\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12H\n" +
	"\bgetShops\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12S\n" +
	"\x13getSoftDeletedShops\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12J\n" +
	"\n" +
	"countShops\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12K\n" +
	"\vsaveChannel\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12J\n" +
	"\n" +
	"getChannel\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12M\n" +
	"\rdeleteChannel\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12K\n" +
	"\vgetChannels\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12V\n" +
	"\x16getSoftDeletedChannels\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12M\n" +
	"\rcountChannels\x12\x1b.requests.ShopActionRequest\x1a\x1d.responses.ShopActionResponse\"\x00\x12Q\n" +
	"\vsaveProduct\x12\x1e.requests.ProductActionRequest\x1a .responses.ProductActionResponse\"\x00\x12P\n" +
	"\n" +
	"getProduct\x12\x1e.requests.ProductActionRequest\x1a .responses.ProductActionResponse\"\x00\x12S\n" +
	"\rdeleteProduct\x12\x1e.requests.ProductActionRequest\x1a .responses.ProductActionResponse\"\x00\x12Q\n" +
	"\vgetProducts\x12\x1e.requests.ProductActionRequest\x1a .responses.ProductActionResponse\"\x00\x12\\\n" +
	"\x16getSoftDeletedProducts\x12\x1e.requests.ProductActionRequest\x1a .responses.ProductActionResponse\"\x00\x12S\n" +
	"\rcountProducts\x12\x1e.requests.ProductActionRequest\x1a .responses.ProductActionResponse\"\x00\x12K\n" +
	"\tsaveOrder\x12\x1c.requests.OrderActionRequest\x1a\x1e.responses.OrderActionResponse\"\x00\x12J\n" +
	"\bgetOrder\x12\x1c.requests.OrderActionRequest\x1a\x1e.responses.OrderActionResponse\"\x00\x12M\n" +
	"\vdeleteOrder\x12\x1c.requests.OrderActionRequest\x1a\x1e.responses.OrderActionResponse\"\x00\x12K\n" +
	"\tgetOrders\x12\x1c.requests.OrderActionRequest\x1a\x1e.responses.OrderActionResponse\"\x00\x12V\n" +
	"\x14getSoftDeletedOrders\x12\x1c.requests.OrderActionRequest\x1a\x1e.responses.OrderActionResponse\"\x00\x12M\n" +
	"\vcountOrders\x12\x1c.requests.OrderActionRequest\x1a\x1e.responses.OrderActionResponse\"\x00\x12Z\n" +
	"\x0esaveCollection\x12!.requests.CollectionActionRequest\x1a#.responses.CollectionActionResponse\"\x00\x12Y\n" +
	"\rgetCollection\x12!.requests.CollectionActionRequest\x1a#.responses.CollectionActionResponse\"\x00\x12\\\n" +
	"\x10deleteCollection\x12!.requests.CollectionActionRequest\x1a#.responses.CollectionActionResponse\"\x00\x12Z\n" +
	"\x0egetCollections\x12!.requests.CollectionActionRequest\x1a#.responses.CollectionActionResponse\"\x00\x12e\n" +
	"\x19getSoftDeletedCollections\x12!.requests.CollectionActionRequest\x1a#.responses.CollectionActionResponse\"\x00\x12\\\n" +
	"\x10countCollections\x12!.requests.CollectionActionRequest\x1a#.responses.CollectionActionResponse\"\x00\x12_\n" +
	"\x11createTransaction\x12\".requests.TransactionActionRequest\x1a$.responses.TransactionActionResponse\"\x00\x12\\\n" +
	"\x0egetTransaction\x12\".requests.TransactionActionRequest\x1a$.responses.TransactionActionResponse\"\x00\x12]\n" +
	"\x0fgetTransactions\x12\".requests.TransactionActionRequest\x1a$.responses.TransactionActionResponse\"\x00\x12h\n" +
	"\x1agetSoftDeletedTransactions\x12\".requests.TransactionActionRequest\x1a$.responses.TransactionActionResponse\"\x00\x12_\n" +
	"\x11countTransactions\x12\".requests.TransactionActionRequest\x1a$.responses.TransactionActionResponse\"\x00\x12N\n" +
	"\bwebhooks\x12\x1e.requests.WebhookActionRequest\x1a .responses.WebhookActionResponse\"\x00B$Z\"github.com/romvales/moceserver/genb\x06proto3"

var file_monolith_proto_goTypes = []any{
	(*models.HelloRequest)(nil),              // 0: models.HelloRequest
	(*anypb.Any)(nil),                        // 1: google.protobuf.Any
	(*models.UserActionRequest)(nil),         // 2: requests.UserActionRequest
	(*models.CustomerActionRequest)(nil),     // 3: requests.CustomerActionRequest
	(*models.ShopActionRequest)(nil),         // 4: requests.ShopActionRequest
	(*models.ProductActionRequest)(nil),      // 5: requests.ProductActionRequest
	(*models.OrderActionRequest)(nil),        // 6: requests.OrderActionRequest
	(*models.CollectionActionRequest)(nil),   // 7: requests.CollectionActionRequest
	(*models.TransactionActionRequest)(nil),  // 8: requests.TransactionActionRequest
	(*models.WebhookActionRequest)(nil),      // 9: requests.WebhookActionRequest
	(*models.HelloResponse)(nil),             // 10: models.HelloResponse
	(*models.UserActionResponse)(nil),        // 11: responses.UserActionResponse
	(*models.CustomerActionResponse)(nil),    // 12: responses.CustomerActionResponse
	(*models.ShopActionResponse)(nil),        // 13: responses.ShopActionResponse
	(*models.ProductActionResponse)(nil),     // 14: responses.ProductActionResponse
	(*models.OrderActionResponse)(nil),       // 15: responses.OrderActionResponse
	(*models.CollectionActionResponse)(nil),  // 16: responses.CollectionActionResponse
	(*models.TransactionActionResponse)(nil), // 17: responses.TransactionActionResponse
	(*models.WebhookActionResponse)(nil),     // 18: responses.WebhookActionResponse
}
var file_monolith_proto_depIdxs = []int32{
	0,  // 0: monolith.MoceMonolithService.hello:input_type -> models.HelloRequest
	1,  // 1: monolith.MoceMonolithService.moceStats:input_type -> google.protobuf.Any
	2,  // 2: monolith.MoceMonolithService.saveUser:input_type -> requests.UserActionRequest
	2,  // 3: monolith.MoceMonolithService.getUser:input_type -> requests.UserActionRequest
	2,  // 4: monolith.MoceMonolithService.deleteUser:input_type -> requests.UserActionRequest
	2,  // 5: monolith.MoceMonolithService.getUsers:input_type -> requests.UserActionRequest
	2,  // 6: monolith.MoceMonolithService.getSoftDeletedUsers:input_type -> requests.UserActionRequest
	2,  // 7: monolith.MoceMonolithService.countUsers:input_type -> requests.UserActionRequest
	3,  // 8: monolith.MoceMonolithService.saveCustomer:input_type -> requests.CustomerActionRequest
	3,  // 9: monolith.MoceMonolithService.getCustomer:input_type -> requests.CustomerActionRequest
	3,  // 10: monolith.MoceMonolithService.deleteCustomer:input_type -> requests.CustomerActionRequest
	3,  // 11: monolith.MoceMonolithService.getCustomers:input_type -> requests.CustomerActionRequest
	3,  // 12: monolith.MoceMonolithService.getSoftDeletedCustomers:input_type -> requests.CustomerActionRequest
	3,  // 13: monolith.MoceMonolithService.countCustomers:input_type -> requests.CustomerActionRequest
	4,  // 14: monolith.MoceMonolithService.saveShop:input_type -> requests.ShopActionRequest
	4,  // 15: monolith.MoceMonolithService.getShop:input_type -> requests.ShopActionRequest
	4,  // 16: monolith.MoceMonolithService.deleteShop:input_type -> requests.ShopActionRequest
	4,  // 17: monolith.MoceMonolithService.getShops:input_type -> requests.ShopActionRequest
	4,  // 18: monolith.MoceMonolithService.getSoftDeletedShops:input_type -> requests.ShopActionRequest
	4,  // 19: monolith.MoceMonolithService.countShops:input_type -> requests.ShopActionRequest
	4,  // 20: monolith.MoceMonolithService.saveChannel:input_type -> requests.ShopActionRequest
	4,  // 21: monolith.MoceMonolithService.getChannel:input_type -> requests.ShopActionRequest
	4,  // 22: monolith.MoceMonolithService.deleteChannel:input_type -> requests.ShopActionRequest
	4,  // 23: monolith.MoceMonolithService.getChannels:input_type -> requests.ShopActionRequest
	4,  // 24: monolith.MoceMonolithService.getSoftDeletedChannels:input_type -> requests.ShopActionRequest
	4,  // 25: monolith.MoceMonolithService.countChannels:input_type -> requests.ShopActionRequest
	5,  // 26: monolith.MoceMonolithService.saveProduct:input_type -> requests.ProductActionRequest
	5,  // 27: monolith.MoceMonolithService.getProduct:input_type -> requests.ProductActionRequest
	5,  // 28: monolith.MoceMonolithService.deleteProduct:input_type -> requests.ProductActionRequest
	5,  // 29: monolith.MoceMonolithService.getProducts:input_type -> requests.ProductActionRequest
	5,  // 30: monolith.MoceMonolithService.getSoftDeletedProducts:input_type -> requests.ProductActionRequest
	5,  // 31: monolith.MoceMonolithService.countProducts:input_type -> requests.ProductActionRequest
	6,  // 32: monolith.MoceMonolithService.saveOrder:input_type -> requests.OrderActionRequest
	6,  // 33: monolith.MoceMonolithService.getOrder:input_type -> requests.OrderActionRequest
	6,  // 34: monolith.MoceMonolithService.deleteOrder:input_type -> requests.OrderActionRequest
	6,  // 35: monolith.MoceMonolithService.getOrders:input_type -> requests.OrderActionRequest
	6,  // 36: monolith.MoceMonolithService.getSoftDeletedOrders:input_type -> requests.OrderActionRequest
	6,  // 37: monolith.MoceMonolithService.countOrders:input_type -> requests.OrderActionRequest
	7,  // 38: monolith.MoceMonolithService.saveCollection:input_type -> requests.CollectionActionRequest
	7,  // 39: monolith.MoceMonolithService.getCollection:input_type -> requests.CollectionActionRequest
	7,  // 40: monolith.MoceMonolithService.deleteCollection:input_type -> requests.CollectionActionRequest
	7,  // 41: monolith.MoceMonolithService.getCollections:input_type -> requests.CollectionActionRequest
	7,  // 42: monolith.MoceMonolithService.getSoftDeletedCollections:input_type -> requests.CollectionActionRequest
	7,  // 43: monolith.MoceMonolithService.countCollections:input_type -> requests.CollectionActionRequest
	8,  // 44: monolith.MoceMonolithService.createTransaction:input_type -> requests.TransactionActionRequest
	8,  // 45: monolith.MoceMonolithService.getTransaction:input_type -> requests.TransactionActionRequest
	8,  // 46: monolith.MoceMonolithService.getTransactions:input_type -> requests.TransactionActionRequest
	8,  // 47: monolith.MoceMonolithService.getSoftDeletedTransactions:input_type -> requests.TransactionActionRequest
	8,  // 48: monolith.MoceMonolithService.countTransactions:input_type -> requests.TransactionActionRequest
	9,  // 49: monolith.MoceMonolithService.webhooks:input_type -> requests.WebhookActionRequest
	10, // 50: monolith.MoceMonolithService.hello:output_type -> models.HelloResponse
	1,  // 51: monolith.MoceMonolithService.moceStats:output_type -> google.protobuf.Any
	11, // 52: monolith.MoceMonolithService.saveUser:output_type -> responses.UserActionResponse
	11, // 53: monolith.MoceMonolithService.getUser:output_type -> responses.UserActionResponse
	11, // 54: monolith.MoceMonolithService.deleteUser:output_type -> responses.UserActionResponse
	11, // 55: monolith.MoceMonolithService.getUsers:output_type -> responses.UserActionResponse
	11, // 56: monolith.MoceMonolithService.getSoftDeletedUsers:output_type -> responses.UserActionResponse
	11, // 57: monolith.MoceMonolithService.countUsers:output_type -> responses.UserActionResponse
	12, // 58: monolith.MoceMonolithService.saveCustomer:output_type -> responses.CustomerActionResponse
	12, // 59: monolith.MoceMonolithService.getCustomer:output_type -> responses.CustomerActionResponse
	12, // 60: monolith.MoceMonolithService.deleteCustomer:output_type -> responses.CustomerActionResponse
	12, // 61: monolith.MoceMonolithService.getCustomers:output_type -> responses.CustomerActionResponse
	12, // 62: monolith.MoceMonolithService.getSoftDeletedCustomers:output_type -> responses.CustomerActionResponse
	12, // 63: monolith.MoceMonolithService.countCustomers:output_type -> responses.CustomerActionResponse
	13, // 64: monolith.MoceMonolithService.saveShop:output_type -> responses.ShopActionResponse
	13, // 65: monolith.MoceMonolithService.getShop:output_type -> responses.ShopActionResponse
	13, // 66: monolith.MoceMonolithService.deleteShop:output_type -> responses.ShopActionResponse
	13, // 67: monolith.MoceMonolithService.getShops:output_type -> responses.ShopActionResponse
	13, // 68: monolith.MoceMonolithService.getSoftDeletedShops:output_type -> responses.ShopActionResponse
	13, // 69: monolith.MoceMonolithService.countShops:output_type -> responses.ShopActionResponse
	13, // 70: monolith.MoceMonolithService.saveChannel:output_type -> responses.ShopActionResponse
	13, // 71: monolith.MoceMonolithService.getChannel:output_type -> responses.ShopActionResponse
	13, // 72: monolith.MoceMonolithService.deleteChannel:output_type -> responses.ShopActionResponse
	13, // 73: monolith.MoceMonolithService.getChannels:output_type -> responses.ShopActionResponse
	13, // 74: monolith.MoceMonolithService.getSoftDeletedChannels:output_type -> responses.ShopActionResponse
	13, // 75: monolith.MoceMonolithService.countChannels:output_type -> responses.ShopActionResponse
	14, // 76: monolith.MoceMonolithService.saveProduct:output_type -> responses.ProductActionResponse
	14, // 77: monolith.MoceMonolithService.getProduct:output_type -> responses.ProductActionResponse
	14, // 78: monolith.MoceMonolithService.deleteProduct:output_type -> responses.ProductActionResponse
	14, // 79: monolith.MoceMonolithService.getProducts:output_type -> responses.ProductActionResponse
	14, // 80: monolith.MoceMonolithService.getSoftDeletedProducts:output_type -> responses.ProductActionResponse
	14, // 81: monolith.MoceMonolithService.countProducts:output_type -> responses.ProductActionResponse
	15, // 82: monolith.MoceMonolithService.saveOrder:output_type -> responses.OrderActionResponse
	15, // 83: monolith.MoceMonolithService.getOrder:output_type -> responses.OrderActionResponse
	15, // 84: monolith.MoceMonolithService.deleteOrder:output_type -> responses.OrderActionResponse
	15, // 85: monolith.MoceMonolithService.getOrders:output_type -> responses.OrderActionResponse
	15, // 86: monolith.MoceMonolithService.getSoftDeletedOrders:output_type -> responses.OrderActionResponse
	15, // 87: monolith.MoceMonolithService.countOrders:output_type -> responses.OrderActionResponse
	16, // 88: monolith.MoceMonolithService.saveCollection:output_type -> responses.CollectionActionResponse
	16, // 89: monolith.MoceMonolithService.getCollection:output_type -> responses.CollectionActionResponse
	16, // 90: monolith.MoceMonolithService.deleteCollection:output_type -> responses.CollectionActionResponse
	16, // 91: monolith.MoceMonolithService.getCollections:output_type -> responses.CollectionActionResponse
	16, // 92: monolith.MoceMonolithService.getSoftDeletedCollections:output_type -> responses.CollectionActionResponse
	16, // 93: monolith.MoceMonolithService.countCollections:output_type -> responses.CollectionActionResponse
	17, // 94: monolith.MoceMonolithService.createTransaction:output_type -> responses.TransactionActionResponse
	17, // 95: monolith.MoceMonolithService.getTransaction:output_type -> responses.TransactionActionResponse
	17, // 96: monolith.MoceMonolithService.getTransactions:output_type -> responses.TransactionActionResponse
	17, // 97: monolith.MoceMonolithService.getSoftDeletedTransactions:output_type -> responses.TransactionActionResponse
	17, // 98: monolith.MoceMonolithService.countTransactions:output_type -> responses.TransactionActionResponse
	18, // 99: monolith.MoceMonolithService.webhooks:output_type -> responses.WebhookActionResponse
	50, // [50:100] is the sub-list for method output_type
	0,  // [0:50] is the sub-list for method input_type
	0,  // [0:0] is the sub-list for extension type_name
	0,  // [0:0] is the sub-list for extension extendee
	0,  // [0:0] is the sub-list for field type_name
}

func init() { file_monolith_proto_init() }
func file_monolith_proto_init() {
	if File_monolith_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_monolith_proto_rawDesc), len(file_monolith_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   0,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_monolith_proto_goTypes,
		DependencyIndexes: file_monolith_proto_depIdxs,
	}.Build()
	File_monolith_proto = out.File
	file_monolith_proto_goTypes = nil
	file_monolith_proto_depIdxs = nil
}
