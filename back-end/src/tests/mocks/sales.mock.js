const getAll = [
	{
		"id": 1,
		"total_price": "9.98",
		"delivery_address": "123asd",
		"delivery_number": "123344",
		"status": "Pendente",
		"sale_date": "2022-06-09T20:05:32.000Z",
		"user_id": 3
	},
	{
		"id": 2,
		"total_price": "9.98",
		"delivery_address": "123asd",
		"delivery_number": "123344",
		"status": "Pendente",
		"sale_date": "2022-06-09T21:00:50.000Z",
		"user_id": 1
	}
];

const getByUserId = {
	"id": 1,
	"total_price": "9.98",
	"delivery_address": "123asd",
	"delivery_number": "123344",
	"status": "Pendente",
	"sale_date": "2022-06-09T20:05:32.000Z",
	"user_id": 3
}

const getBySellerId = {
	"id": 2,
	"total_price": "9.98",
	"delivery_address": "123asd",
	"delivery_number": "123344",
	"status": "Pendente",
	"sale_date": "2022-06-09T21:00:50.000Z",
	"user_id": 1
}

module.exports = {
  getAll,
  getByUserId,
  getBySellerId,
} 