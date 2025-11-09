<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;

class GoalController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id'     => 'required|exists:users,id',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_date' => 'required|date',
            'status'      => 'required|string',
        ]);

        $goal = Goal::create($validated);

        return response()->json(['status' => 'success', 'data' => $goal], 201);
    }

    public function index()
    {
        return response()->json(Goal::all(), 200);
    }

    public function show($id)
    {
        $goal = Goal::find($id);
        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }
        return response()->json($goal);
    }

    public function update(Request $request, $id)
    {
        $goal = Goal::find($id);
        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'target_date' => 'nullable|date',
            'status'      => 'nullable|string',
            'user_id'     => 'sometimes|integer|exists:users,id',
        ]);

        $goal->fill($validated);
        $goal->save();

        return response()->json($goal);
    }

    public function destroy($id)
    {
        $goal = Goal::find($id);
        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }

        $goal->delete();
        return response()->json(['message' => 'Goal deleted'], 200);
    }
}
