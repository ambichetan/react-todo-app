import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TodoFilter({ filter, setFilter }) {
  return (
    <Tabs value={filter} onValueChange={setFilter} className="w-full mb-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default TodoFilter;
