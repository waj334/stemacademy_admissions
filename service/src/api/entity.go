package main

import (
	"github.com/Masterminds/squirrel"
	"github.com/Masterminds/structable"
)

// Entity base database object
type Entity struct {
	structable.Recorder
	builder squirrel.StatementBuilderType

	ID 		string	`stbl:"id,PRIMARY_KEY"`
	TypeID  int		`stbl:"type_id"`	
}

// EntityType gives type of enitity
type EntityType struct {
	structable.Recorder
	builder squirrel.StatementBuilderType

	ID		string	`stbl:"id,PRIMARY_KEY"`
	Type	string	`stbl:"type"`
}

//NewEntity Creates a new base object
func NewEntity(db squirrel.DBProxyBeginner, driver string) *Entity {
	e := new(Entity)
	e.Recorder = structable.New(db, driver).Bind("entity", e)
	return e
}

//NewEntityType Create a new entity type object
func NewEntityType(db squirrel.DBProxyBeginner, driver string) *EntityType {
	t := new(EntityType)
	t.Recorder = structable.New(db, driver).Bind("entity_type", t)
	return t
}