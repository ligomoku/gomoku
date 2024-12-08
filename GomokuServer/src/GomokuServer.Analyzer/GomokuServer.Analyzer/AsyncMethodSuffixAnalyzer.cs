using System.Collections.Immutable;

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace GomokuServer.Analyzer;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class AsyncMethodSuffixAnalyzer : DiagnosticAnalyzer
{
	private static readonly DiagnosticDescriptor AsyncSuffixRule = new DiagnosticDescriptor(
		id: "GOMOKU002",
		title: "Async methods should end with 'Async'",
		messageFormat: "Method '{0}' is async but does not end with 'Async'",
		category: "Naming",
		defaultSeverity: DiagnosticSeverity.Error,
		isEnabledByDefault: true,
		description: "All async methods should have names ending with 'Async' to follow standard conventions.");

	public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
		=> ImmutableArray.Create(AsyncSuffixRule);

	public override void Initialize(AnalysisContext context)
	{
		context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
		context.EnableConcurrentExecution();

		// Register for method declaration analysis
		context.RegisterSyntaxNodeAction(AnalyzeMethod, SyntaxKind.MethodDeclaration);
	}

	private static void AnalyzeMethod(SyntaxNodeAnalysisContext context)
	{
		var methodDeclaration = (MethodDeclarationSyntax)context.Node;
		var containingClass = methodDeclaration.FirstAncestorOrSelf<TypeDeclarationSyntax>();

		if (containingClass?.Identifier.Text.Contains("Hub") == true || containingClass?.Identifier.Text.Contains("MatchingEngine") == true)
		{
			return;
		}

		var isTaskReturnType = methodDeclaration.ReturnType.ToString().Equals("Task");

		if (!isTaskReturnType)
		{
			return;
		}

		// Check if the method name ends with "Async"
		var methodName = methodDeclaration.Identifier.Text;
		if (methodName.EndsWith("Async") || methodName.Equals("Handle"))
		{
			return;
		}

		// Report diagnostic if the name doesn't end with "Async"
		var diagnostic = Diagnostic.Create(
			AsyncSuffixRule,
			methodDeclaration.Identifier.GetLocation(),
			methodName);

		context.ReportDiagnostic(diagnostic);
	}
}
